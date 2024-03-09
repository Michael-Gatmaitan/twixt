import mongoose from "mongoose";
import { extendTailwindMerge } from "tailwind-merge";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB URI UNDEFINED");
}

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// const gbl = global;

// let cached = gbl.mongoose;

// if (!cached) {
//   cached = gbl.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     // biome-ignore lint/style/noNonNullAssertion: <explanation>
//     cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

const connectDB = async () => await mongoose.connect(MONGODB_URI);

export default connectDB;
