import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });


import pkg from 'pg'

const { Client } = pkg


const database = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// Connect once
const connectDB = async () => {
    try {
        await database.connect();
        console.log('PostgreSQL database connected ✅');
    } catch (err) {
        console.error('Connection error ❌:', err.message);
        process.exit(1)
    }
};


await connectDB()


export default database;