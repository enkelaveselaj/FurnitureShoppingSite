import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return Response.json(
        { error: "Missing required fields: name, email, password" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: "user",
    });

    return Response.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    
    // Handle specific database connection errors
    if (error.message.includes("Database connection failed")) {
      return Response.json(
        { 
          error: "Database connection failed. Please ensure MongoDB is running.",
          details: "MongoDB service is not available"
        },
        { status: 503 }
      );
    }
    
    return Response.json(
      { 
        error: "Registration failed", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}