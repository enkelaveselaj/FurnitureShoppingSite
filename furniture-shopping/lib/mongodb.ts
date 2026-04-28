import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/furnitureDB";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {

  if (cached.conn) return cached.conn;

  if (!cached.promise) {

    cached.promise = mongoose.connect(
      MONGODB_URI
    );

  }

  cached.conn = await cached.promise;

  return cached.conn;
}