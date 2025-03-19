import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js"


dotenv.config()
const app = express();

app.use(express.json()) // middleware that allows acceptance of JSON data in the body

app.use("/api/products", productRoutes)

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
}); 

