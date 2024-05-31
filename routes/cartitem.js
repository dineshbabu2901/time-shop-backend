import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import passport from "passport";
const app = Router();

const CartItem = mongoose.model("CartItem");

app.post(
  "/cart",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!productId || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newItem = new CartItem({
        productId,
        quantity,
        userId: req.user._id,
      });

      await newItem.save();

      res.status(201).json({ message: "Cart item added successfully" });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get(
  "/cart/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // const userId = req.user._id;
      const userId = req.params.userId;

      const cartItems = await CartItem.find({ userId }).populate("productId");
      console.log(cartItems, "aslfdkj");

      if (!cartItems) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json(cartItems);
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      res.status(500).json({ error: "Error retrieving cart items" });
    }
  }
);

app.put("/cart/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await CartItem.findByIdAndUpdate(itemId, { quantity });

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/cart/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;

    await CartItem.findByIdAndDelete(itemId);

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
