import database from "../database/db.js"
import CustomErrorHandler from "../middlewares/errorMiddleware.js";
import { generatePaymentIntent } from "../utils/generatePaymentIntent.js";





export const placeNewOrder = async (req, res) => {

    const { full_name, state, city, country, address, pincode, phone, orderedItems } = req.body;

    if (!full_name || !state || !city || !country || !address || !pincode || !phone) {
        throw new CustomErrorHandler("please provide all shipping details", 400)
    }

    const orderedCollection = Array.isArray(orderedItems) ? orderedItems : JSON.parse(orderedItems);

    if (!orderedCollection || orderedCollection.length === 0) {
        throw new CustomErrorHandler("Cart is empty.", 400)
    }



    const productIds = orderedCollection.map((order) => order.product.id)
    if (!productIds.length) throw new CustomErrorHandler("No valid product IDs", 400);

    const { rows: products } = await database.query(`SELECT id, price, stock, name FROM products WHERE id = ANY($1::uuid[])`, [productIds])


    let total_price = 0;
    const values = [];
    const placeholders = [];

    orderedCollection.forEach((order, index) => {
        const product = products.find((p) => p.id === order.product.id)

        if (!product) {
            throw new CustomErrorHandler(`product not found for ID: ${order.product.id}`, 404)
        }

        if (order.quantity > product.stock) {
            throw new CustomErrorHandler(`Only ${product.stock} units available of ${product.name}`, 400)
        }

        const itemTotal = product.price * order.quantity;
        total_price += itemTotal


        values.push(null, product.id, order.quantity, product.price, order.product.images[0].url || "", product.name)

        const offset = index * 6;

        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6} )`)

    });

    const tax_price = 0.18;
    const shipping_price = total_price >= 50 ? 0 : 2;
    total_price = Math.round(total_price + (total_price * tax_price) + shipping_price)

    const orderResult = await database.query(`INSERT INTO orders (buyer_id, total_price, tax_price, shipping_price) VALUES ($1, $2, $3, $4) RETURNING *`, [req.user.id, total_price, tax_price, shipping_price])

    const orderId = orderResult.rows[0].id;

    for (let i = 0; i < values.length; i += 6) {
        values[i] = orderId
    }

    await database.query(`INSERT INTO order_items (order_id, product_id, quantity, price, image, title) VALUES ${placeholders.join(", ")} RETURNING *`, values)


    await database.query(`INSERT INTO shipping_info (order_id, full_name, state, city, country, address, pincode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [orderId, full_name, state, city, country, address, pincode, phone]);

    const paymentResponse = await generatePaymentIntent(orderId, total_price)

    if (!paymentResponse.success) {
        throw new CustomErrorHandler("payment Failed. Try again.", 500)
    }

    res.status(200).json({ success: true, message: "Order placed successfully. please proceed to payment.", paymentIntent: paymentResponse.clientSecret, total_price })

}


export const fetchSingleOrder = async (req, res) => {
    const { orderId } = req.params

    const result = await database.query(`SELECT 
    o.*, 
    COALESCE(
        json_agg(
            json_build_object(
                'order_item_id', oi.id,
                'order_id', oi.order_id,
                'product_id', oi.product_id,
                'quantity', oi.quantity,
                'price', oi.price
            )
        ) FILTER (WHERE oi.id IS NOT NULL), '[]'
    ) AS order_items,
    json_build_object(
        'full_name', s.full_name,
        'state', s.state,
        'city', s.city,
        'country', s.country,
        'address', s.address,
        'pincode', s.pincode,
        'phone', s.phone
    ) AS shipping_info
FROM 
    orders o
LEFT JOIN 
    order_items oi ON o.id = oi.order_id
LEFT JOIN 
    shipping_info s ON o.id = s.order_id
WHERE 
    o.id = $1
GROUP BY 
    o.id, s.id;
`, [orderId])
    res.status(200).json({ success: true, message: "Order fetched successfully", orders: result.rows[0] })
}


export const fetchMyOrders = async (req, res) => {
    const result = await database.query(
        `
        SELECT o.*, COALESCE(
 json_agg(
  json_build_object(
 'order_item_id', oi.id,
 'order_id', oi.order_id,
 'product_id', oi.product_id,
 'quantity', oi.quantity,
 'price', oi.price,
 'image', oi.image,
 'title', oi.title
  ) 
 ) FILTER (WHERE oi.id IS NOT NULL), '[]'
 ) AS order_items,
json_build_object(
 'full_name', s.full_name,
 'state', s.state,
 'city', s.city,
 'country', s.country,
 'address', s.address,
 'pincode', s.pincode,
 'phone', s.phone
 ) AS shipping_info 
 FROM orders o
 LEFT JOIN order_items oi ON o.id = oi.order_id
 LEFT JOIN shipping_info s ON o.id = s.order_id
WHERE o.buyer_id = $1
--AND o.paid_at IS NOT NULL
GROUP BY o.id, s.id
        `,
        [req.user.id]
    );

    res.status(200).json({
        success: true,
        message: "All your orders are fetched.",
        myOrders: result.rows,
    });
};


export const fetchAllOrders = async (req, res) => {
    const result = await database.query(`
            SELECT o.*,
 COALESCE(json_agg(
 json_build_object(
 'order_item_id', oi.id,
 'order_id', oi.order_id,
 'product_id', oi.product_id,
 'quantity', oi.quantity,
 'price', oi.price,
 'image', oi.image,
 'title', oi.title
)
) FILTER (WHERE oi.id IS NOT NULL), '[]' ) AS order_items, json_build_object(
'full_name', s.full_name,
 'state', s.state,
 'city', s.city,
 'country', s.country,
 'address', s.address,
 'pincode', s.pincode,
 'phone', s.phone 
) AS shipping_info
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN shipping_info s ON o.id = s.order_id
-- WHERE o.paid_at IS NOT NULL
GROUP BY o.id, s.id
        `);

    res.status(200).json({
        success: true,
        message: "All orders fetched.",
        orders: result.rows,
    });
};


export const updateOrderStatus = async (req, res, next) => {
    const { status } = req.body;
    if (!status) {
        return next(new ErrorHandler("Provide a valid status for order.", 400));
    }
    const { orderId } = req.params;
    console.log("line 212");

    const results = await database.query(
        `
        SELECT * FROM orders WHERE id = $1
        `,
        [orderId]
    );
    console.log("line 220");

    if (results.rows.length === 0) {
        return next(new ErrorHandler("Invalid order ID.", 404));
    }
    console.log("line 225");

    const updatedOrder = await database.query(
        `
        UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *
        `,
        [status, orderId]
    );
    console.log("line 233");

    res.status(200).json({
        success: true,
        message: "Order status updated.",
        updatedOrder: updatedOrder.rows[0],
    });
};


export const deleteOrder = async (req, res, next) => {
    const { orderId } = req.params;
    const results = await database.query(
        `
        DELETE FROM orders WHERE id = $1 RETURNING *
        `,
        [orderId]
    );
    if (results.rows.length === 0) {
        return next(new ErrorHandler("Invalid order ID.", 404));
    }

    res.status(200).json({
        success: true,
        message: "Order deleted.",
        order: results.rows[0],
    });
};