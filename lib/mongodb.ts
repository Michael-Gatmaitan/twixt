import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI UNDEFINED");
}

const connectDB = async () => await mongoose.connect(MONGODB_URI);

export default connectDB;
