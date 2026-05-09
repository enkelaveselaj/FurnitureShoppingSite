import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  await connectDB();

  const products = await Product.find();
  console.log("GET products - returning:", products);

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await req.json();
    console.log("Creating product with data:", body);

    const product = await Product.create(body);
    console.log("Created product:", product);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 400 }
    );
  }
}