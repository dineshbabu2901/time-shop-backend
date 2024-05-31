import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 9006;

/**
 * schema import
 */
import "./modules/signin.js";
import "./modules/product.js";
import auth from "./jwt.js";
import "./modules/cartitem.js";
import "./modules/profile.js";

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
passport.use(auth);

/**
 * mongodb connection
 */
const mongodbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Time", {});
    console.log("mongodb connected");
  } catch (error) {
    return console.log("error", error);
  }
};

/**
 * routes import
 */

import sign from "./routes/sigin.js";
import product from "./routes/product.js";
import cartitem from "./routes/cartitem.js";
import profile from "./routes/profile.js";

/**
 * routes call
 */

app.use("/post", sign);
app.use("/product", product);
app.use(
  "/cartitem",
  passport.authenticate("jwt", { session: false }),
  cartitem
);
app.use("/profile", passport.authenticate("jwt", { session: false }), profile);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongodbConnection();
});
