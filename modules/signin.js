import mongoose, { Schema, Types, now } from "mongoose";

const signSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  location: {
    type: String,
  },
});

export default mongoose.model("sign", signSchema);
