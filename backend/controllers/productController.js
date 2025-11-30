import database from "../database/db.js"
import CustomErrorHandler from "../middlewares/errorMiddleware.js"
import { v2 as cloudinary } from "cloudinary"
import { getAIRecommendation } from "../utils/getAIRecommendation.js"



export const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body

    if (!name || !description || !price || !category || !stock) {
        throw new CustomErrorHandler("All details are reqired", 400)
    }

    let productImages = []
    if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images]

        for (const image of images) {
            const result = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: "Store_product_images",
                width: 900,
                crop: "scale",
            })


            productImages.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        };

    }

    const product = await database.query("INSERT INTO products (name, description, price, category, stock, images, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, description, price, category, stock, JSON.stringify(productImages), req.user.id])

    res.status(201).json({ success: true, message: "product Added successfully", product: product.rows[0] })
}


export const fetchAllProducts = async (req, res) => {

    const { availability, price, category, ratings, search } = req.query

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    let conditions = []
    let values = []
    let index = 1

    let paginationPlaceholder = {}

    if (availability === "in-stock") {
        conditions.push("stock > 0")
    } else if (availability === "limited") {
        conditions.push("stock > 0 AND stock <= 5")
    } else if (availability === "out-of-stock") {
        conditions.push("stock = 0")
    }


    if (price) {
        const [minPrice, maxPrice] = price.split("-")
        if (minPrice && maxPrice) {
            conditions.push(`price BETWEEN $${index} AND $${index + 1}`)
            values.push(minPrice, maxPrice)
            index += 2
        }
    }

    if (category) {
        conditions.push(`category ILIKE $${index}`)
        values.push(`%${category}%`)
        index++
    }


    if (ratings) {
        conditions.push(`ratings >= $${index}`)
        values.push(ratings)
        index++
    }

    if (search) {
        conditions.push(`(p.name ILIKE $${index} OR p.description ILIKE $${index})`)
        values.push(`%${search}%`)
        index++
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""


    const totalProductsResult = await database.query(`SELECT COUNT(*) FROM products p ${whereClause}`, values);

    const totalProducts = parseInt(totalProductsResult.rows[0].count)

    paginationPlaceholder.limit = `$${index}`
    values.push(limit)
    index++

    paginationPlaceholder.offset = `$${index}`
    values.push(offset)
    index++


    const query = `
    SELECT p.*, COUNT(r.id) AS review_count FROM products p LEFT JOIN reviews r ON p.id = r.product_id ${whereClause} GROUP BY p.id ORDER BY p.created_at DESC LIMIT ${paginationPlaceholder.limit} OFFSET ${paginationPlaceholder.offset}
    `;

    const result = await database.query(query, values);
    const newProductsQuery = `
    SELECT p.*,
    COUNT(r.id) AS review_count
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    WHERE p.created_at >= NOW() - INTERVAL '30 days'
    GROUP BY p.id
    ORDER BY  created_at DESC
    LIMIT 8
    `
    const newProductsResult = await database.query(newProductsQuery);

    const topRatedQuery = `
    SELECT p.*,
    COUNT(r.id) AS review_count
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    WHERE p.ratings >= 4.5
    GROUP BY p.id
    ORDER BY p.ratings DESC, p.created_at DESC
    LIMIT 8
    `
    const topRatedResult = await database.query(topRatedQuery);


    res.status(200).json({
        success: true,
        products: result.rows,
        totalProducts,
        newProducts: newProductsResult.rows,
        topRatedProducts: topRatedResult.rows,
    })

}

// SET THE CURRENCY IN THIS API - if you wanna change currency
export const updateProduct = async (req, res) => {
    const { productId } = req.params
    const { name, description, price, category, stock } = req.body

    if (!name || !description || !price || !category || !stock) {
        throw new CustomErrorHandler("All details are reqired", 400)
    }

    const productExist = await database.query("SELECT * FROM products WHERE id = $1", [productId])

    if (productExist.rows.length === 0) {
        throw new CustomErrorHandler("Product not found", 404)
    }

    const result = await database.query("UPDATE products SET name = $1, description = $2, price = $3, category = $4, stock = $5 WHERE id = $6 RETURNING *", [name, description, price, category, stock, productId])

    res.status(200).json({
        success: true, message: "Product updated successfully",
        updatedProduct: result.rows[0]
    })

}


export const deleteProduct = async (req, res) => {
    const { productId } = req.params

    const productExist = await database.query("SELECT * FROM products WHERE id = $1", [productId])

    if (productExist.rows.length === 0) {
        throw new CustomErrorHandler("Product not found", 404)
    }

    const images = productExist.rows[0].images;

    const deleteResult = await database.query("DELETE FROM products WHERE id = $1 RETURNING *", [productId])

    if (deleteResult.rows.length === 0) {
        throw new CustomErrorHandler("failed to delete product", 500)
    }

    if (images && images.length > 0) {
        for (const image of images) {
            await cloudinary.uploader.destroy(image.public_id)
        }
    }


    res.status(200).json({
        success: true, message: "Product delete successfully", deleteProduct: deleteResult.rows[0]
    })


}



export const fetchSingleProduct = async (req, res) => {
    const { productId } = req.params;

    const result = await database.query(`
    SELECT p.*,
        COALESCE(
            json_agg(
                json_build_object(
                    'review_id', r.id,
                    'rating', r.rating,
                    'comment', r.comment,
                    'reviewer', json_build_object(
                        'id', u.id,
                        'name', u.name,
                        'avatar', u.avatar
                    )
                )
            ) FILTER (WHERE r.id IS NOT NULL), '[]') AS reviews
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    LEFT JOIN users u ON r.user_id = u.id
    WHERE p.id = $1
    GROUP BY p.id
    `, [productId]);

    if (result.rows.length === 0) {
        throw new CustomErrorHandler("Product not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Product fetched successfully.",
        product: result.rows[0],
    });
};



export const postProductReview = async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    if (!rating || !comment) {
        throw new CustomErrorHandler("Please provide rating and comment.", 400);
    }
    const purchaseCheckQuery = `
    SELECT oi.product_id
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    JOIN payments p ON p.order_id = o.id
    WHERE o.buyer_id = $1
    AND oi.product_id = $2
    AND p.payment_status = 'Paid'
    LIMIT 1
    `

    const isProductPurchased = await database.query(purchaseCheckQuery, [req.user.id, productId])

    if (isProductPurchased.rows.length === 0) {
        return res.status(403).json({ success: false, message: "you can only review product you've purchased" })
    }

    const product = await database.query("SELECT * FROM products WHERE id = $1", [productId])

    if (product.rows.length === 0) {
        throw new CustomErrorHandler("product not found", 404)
    }

    const isAlreadyReviewed = await database.query(
        ` SELECT * FROM reviews WHERE product_id = $1 AND user_id = $2`,
        [productId, req.user.id]
    );

    let review
    if (isAlreadyReviewed.rows.length > 0) {
        review = await database.query(
            "UPDATE reviews SET rating = $1, comment = $2 WHERE product_id = $3 AND user_id = $4 RETURNING *",
            [rating, comment, productId, req.user.id]
        );
    } else {
        review = await database.query(
            "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *", [productId, req.user.id, rating, comment]
        )
    }


    const allReviews = await database.query(
        `SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = $1`,
        [productId]
    );
    const newAvgRating = allReviews.rows[0].avg_rating;
    const updatedProduct = await database.query(
        `UPDATE products SET ratings = $1 WHERE id = $2 RETURNING *`,
        [newAvgRating, productId]
    );

    res.status(200).json({
        success: true,
        message: "review posted.",
        review: review.rows[0],
        product: updatedProduct.rows[0]
    })

};



export const deleteReview = async (req, res) => {
    const { productId } = req.params;
    const review = await database.query("DELETE FROM reviews WHERE product_id = $1 AND user_id = $2 RETURNING *", [productId, req.user.id])

    if (review.rows.length === 0) {
        throw new CustomErrorHandler("review not found.", 404)
    }


    const allReviews = await database.query(
        `SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = $1`,
        [productId]
    );
    const newAvgRating = allReviews.rows[0].avg_rating;
    const updatedProduct = await database.query(
        `UPDATE products SET ratings = $1 WHERE id = $2 RETURNING *`,
        [newAvgRating, productId]
    );

    res.status(200).json({
        success: true,
        message: "your review has been deleted.",
        review: review.rows[0],
        product: updatedProduct.rows[0]
    })

}




export const fetchAIFilteredProducts = async (req, res) => {
    const { userPrompt } = req.body;
    if (!userPrompt) {
        throw new CustomErrorHandler("provide valid prompt.", 400)
    }
    const filterKeywords = (query) => {

        const stopWords = new Set([
            "the", "they", "them", "then", "i", "we", "you", "he", "she", "it", "is", "a", "an", "of", "and", "or", "to", "for", "from",
            "on", "who", "whom", "why", "when", "which", "with", "this", "that", "in", "at", "by", "be", "not", "was", "were", "has",
            "have", "had", "do", "does", "did", "so", "some", "any", "how", "can", "could", "should", "would", "there", "here",
            "just", "than", "because", "but", "its", "it's", "if", ".", ",", "!", "?", ";", ">", "<", "`", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "10"
        ]);

        return query
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .split(/\s+/)
            .filter((word) => !stopWords.has(word)).map((word) => `%${word}%`);
    };

    const keywords = filterKeywords(userPrompt)
    console.log(keywords, "keywords is from product controller fetchAIFilteredProducts API ");

    // STEP 1: BASIC SQL FILTERING

    const result = await database.query(`
        SELECT * FROM products WHERE name ILIKE ANY($1) OR description ILIKE ANY($1) OR category ILIKE ANY($1) LIMIT 200`,[keywords])

    const filteredProducts = result.rows

    if (filteredProducts.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No products found matching your prompt",
            products: []
        })
    }
    console.log("line 383");
    console.log(filteredProducts);
    
    // STEP 2: FILTERING BY AI
    const { success, products } = await getAIRecommendation(req, res, userPrompt, filteredProducts)

    res.status(200).json({
        success: true,
        products,
    })

}