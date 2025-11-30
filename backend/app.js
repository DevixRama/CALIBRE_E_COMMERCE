import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

import express from 'express'
const app = express()
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { createTable } from './utils/createTables.js';
import authRouter from './router/authRoutes.js'
import productRouter from './router/productRoutes.js'
import adminRouter from './router/adminRoutes.js'
import orderRouter from './router/orderRoutes.js'
import Stripe from 'stripe';

import database from './database/db.js';



app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


//IMPORTANT
// --------->>>>>>>> Receive Stripe events in your webhook endpoint (search this on stripe doc to get this function and modify according to your use.) <<<<<<<<-----------
app.post("/api/v1/payment/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sign = req.headers["stripe-signature"];
    let event;
    try {
        event = Stripe.webhooks.constructEvent(req.body, sign, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return res.status(400).send(`webhook Error: ${error.message || error}`)
    }

    // handling the Event
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent_client_secret = event.data.object.client_secret;
        try {
            // FINDING AND UPDATED PAYMENT
            const updatedPaymentStatus = "Paid";
            const paymentTableUpdateResult = await database.query(`UPDATE payments SET payment_status = $1 WHERE payment_intent_id = $2 RETURNING *`, [updatedPaymentStatus, paymentIntent_client_secret]);

            const orderTableUpdateResult = await database.query(`UPDATE orders SET paid_at = NOW() WHERE id = $1 RETURNING *`, [paymentTableUpdateResult.rows[0].order_id]);

            //reduce Stock for Each Product
            const orderId = paymentTableUpdateResult.rows[0].order_id;

            const { rows: orderedItems } = await database.query(`SELECT product_id, quantity FROM order_items WHERE order_id = $1`, [orderId])
            console.log("this log from the file app.js. inside the payment webhook \n" + orderedItems);

            // FOR EACH ORDER ITEM SELLS, REDUCE THE PRODUCT STOCK
            for (const item of orderedItems) {
                await database.query(`UPDATE products SET Stock = stock - $1 WHERE id = $2`, [item.quantity, item.product._id])
            }

        } catch (error) {
            return res.status(500).send(`Error updating paid_at TIMESTAMP in orders table.`)
        }
    }

    res.status(200).send({ received: true });

})


app.use(fileUpload({
    tempFileDir: './upload',
    useTempFiles: true
}))


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/order', orderRouter)


createTable()

app.use(errorMiddleware)


export default app