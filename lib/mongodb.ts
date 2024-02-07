import mongoose from "mongoose";
import { ConnectOptions } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const gbl: any = global;

let cached = gbl.mongoose;

if (!cached) {
  cached = gbl.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    };

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
