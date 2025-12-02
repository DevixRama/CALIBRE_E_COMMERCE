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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/v1/payment/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
    console.log("line 35");
    
    
    const signature = req.headers["stripe-signature"];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    console.log("line 51");
    if (event.type === "payment_intent.succeeded") {
        const paymentIntentId = event.data.object.id;
        
        console.log("line 55");
        try {
            const updatedPayment = await database.query(
                `UPDATE payments SET payment_status = $1 WHERE payment_intent_id = $2 RETURNING *`,
                ["Paid", paymentIntentId]
            );
            
            console.log("line 62");
            if (updatedPayment.rows.length === 0) {
                return res.status(200).send({ received: true });
            }
            
            const orderId = updatedPayment.rows[0].order_id;
            
            console.log("line 69");
            await database.query(
                `UPDATE orders SET paid_at = NOW() WHERE id = $1`,
                [orderId]
            );
            console.log("line 74");

            const { rows: orderedItems } = await database.query(
                `SELECT product_id, quantity FROM order_items WHERE order_id = $1`,
                [orderId]
            );

            for (const item of orderedItems) {
                await database.query(
                    `UPDATE products SET stock = stock - $1 WHERE id = $2`,
                    [item.quantity, item.product_id]
                );
            }

        } catch {
            return res.status(500).send("Webhook internal error");
        }
    }

    res.status(200).send({ received: true });
});






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