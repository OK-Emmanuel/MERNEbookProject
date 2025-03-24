import Product from "../models/product.model.js";
import mongoose from "mongoose";
// CREATE PRODUCT

export const createProduct = async (req, res) => {
    // res.send("Server is ready to go");
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: "Please provide all fields"});

    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success:true, date: newProduct})
    } catch(error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// GET PRODUCT

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    }catch(error){
        res.status(404).json({ success: false, message: "There's no product in the database"})
    }
}

// UPDATE PRODUCT

export const updatedProduct = async (req, res) => {
    const {id} = req.params
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID: Product does not exist"})
    }
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, message: "Product Updated Successfully", data: updatedProduct});
    }catch(error) {
        res.status(500).json({ success: false, message: "Internal Server Error: Go and rest"})
    }
}


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID: Product does not exist"})
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted"});
    }catch(error) {
        res.status(500).json({ success: false, message: "Server Error, Chill, we are working on it :)"})
    }
}