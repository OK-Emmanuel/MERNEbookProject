import express from "express";
import { getProducts, createProduct, updatedProduct, deleteProduct } from "../controllers/product.controller.js";
 
const router = express.Router();

// CREATE A PRODUCT
router.post("/", createProduct);

// FETCH ALL PRODUCTS 
router.get("/", getProducts)

// UPDATE SINGLE PRODUCT
router.put("/:id", updatedProduct);

// DELETE SINGLE PRODUCT
router.delete("/:id", deleteProduct);

export default router;