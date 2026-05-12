import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/furnitureDB";
    console.log("Connecting to MongoDB:", mongoUri.replace(/\/\/.*@/, "//***@"));
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      bufferCommands: false,
    });
    
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw new Error("Database connection failed. Please ensure MongoDB is running.");
  }
};