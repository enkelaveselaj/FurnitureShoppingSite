import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {

  await connectDB();

  const products =
    await Product.find();

  return Response.json(products);
}

export async function POST(
  request: Request
) {

  await connectDB();

  const body =
    await request.json();

  const product =
    await Product.create(body);

  return Response.json(product);
}