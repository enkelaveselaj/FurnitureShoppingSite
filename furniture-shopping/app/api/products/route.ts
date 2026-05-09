import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  await connectDB();

  const products = await Product.find();
  
  // Fix image URLs to include full path
  const productsWithFixedUrls = products.map((product: any) => ({
    ...product.toObject(),
    image: product.image ? (product.image.startsWith('http') ? product.image : `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${product.image}`) : product.image
  }));
  
  console.log("GET products - returning:", productsWithFixedUrls);

  return NextResponse.json(productsWithFixedUrls);
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