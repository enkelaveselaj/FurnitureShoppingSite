import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    console.log("Registration request received");
    
    const body = await req.json();
    console.log("Request body:", { ...body, password: "[REDACTED]" });

    if (!body.name || !body.email || !body.password) {
      return Response.json(
        { error: "Missing required fields: name, email, password" },
        { status: 400 }
      );
    }

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected successfully");

    console.log("Checking if user exists...");
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      console.log("User already exists:", body.email);
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(body.password, 10);

    console.log("Creating new user...");
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: "user",
    });

    console.log("User created successfully:", newUser.email);
    return Response.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error stack:", error.stack);
    
    return Response.json(
      { 
        error: "Registration failed", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}