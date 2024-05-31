import mongoose, { Schema } from "mongoose";

const product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    amt: {
      type: Number,
      require: true,
    },
    tAmt: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    key: {
      type: String,
      require: true,
    },
  },
  { timeseries: true }
);

export default mongoose.model("Product", product);
