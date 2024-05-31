import { Router } from "express";
import mongoose, { Schema, now } from "mongoose";
import jwt from "jsonwebtoken";

const signModel = mongoose.model("sign");
const app = Router();

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await signModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(password, user.password);
    if (String(password) !== String(user.password)) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "Random string", {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { email, password, address, pincode, mobileNumber, username } =
      req.body;
    console.log("lasfj;da", req.body);

    const newUser = new signModel({
      username,
      email,
      password,
      address,
      pincode,
      mobileNumber,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
