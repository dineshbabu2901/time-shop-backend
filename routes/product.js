import { Router } from "express";

import mongoose, { Schema, now } from "mongoose";

const Product = mongoose.model("Product");

const app = Router();

app.get("/products", async (req, res) => {
  try {
    if (req.query.id) {
      const product = await Product.findById(req.query.id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } else {
      const products = await Product.find();
      
      res.set('Cache-Control', 'no-store');
      return res.status(200).json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
