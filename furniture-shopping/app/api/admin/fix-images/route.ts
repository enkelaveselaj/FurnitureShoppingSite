import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST() {
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

    // Find all products with placeholder URLs
    const products = await Product.find({});
    
    const updatedProducts = [];
    
    for (const product of products) {
      // Check if image has placeholder URL
      if (product.image && (
        product.image.includes('placeholder.com') ||
        product.image.includes('picsum.photos') ||
        product.image.includes('loremflickr.com')
      )) {
        // Update to use the first uploaded image we have
        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          { image: '/uploads/1778355459628_5yyyga.jpg' }, // Use the uploaded image we found
          { new: true }
        );
        updatedProducts.push({
          id: product._id,
          name: product.name,
          oldImage: product.image,
          newImage: '/uploads/1778355459628_5yyyga.jpg'
        });
      }
    }

    return NextResponse.json({
      message: "Updated placeholder images",
      updatedCount: updatedProducts.length,
      updatedProducts
    });

  } catch (error: any) {
    console.error("Error fixing images:", error);
    return NextResponse.json(
      { error: "Failed to fix images", message: error.message },
      { status: 500 }
    );
  }
}
