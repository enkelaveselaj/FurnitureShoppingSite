import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

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

    return Response.json({ message: "User created" });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}