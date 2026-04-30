import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  console.log("Fetching product with ID:", id);

  try {
    // Try to convert to ObjectId
    const objectId = new ObjectId(id);
    const product = await Product.findById(objectId);

    if (!product) {
      console.log("Product not found for ID:", id);
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    console.log("Product found:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.log("Invalid ObjectId format:", id);
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}