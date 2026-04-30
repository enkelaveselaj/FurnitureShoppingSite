import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  try {
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 400 }
    );
  }
}