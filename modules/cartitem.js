import mongoose, { Schema } from "mongoose";

const CartItem = new Schema(
 
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeseries: true }
);

export default mongoose.model("CartItem", CartItem);
