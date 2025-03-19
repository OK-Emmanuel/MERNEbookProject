import express from 'express';
import { connectDB } from './config/db.js';
const app = express();

app.post("/products", async (req, res) => {
    // res.send("Server is ready to go");
    const product = req.body;
});

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
}); 

// DePdyGWgPXYZiGZm