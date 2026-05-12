import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// GET user's cart
export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user ID from cookies
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookieHeader ? Object.fromEntries(
      cookieHeader.split(';').map(cookie => cookie.trim().split('='))
    ) : {};
    
    const userId = session.user.id; // Use authenticated user ID

    // Get cart items from cookie
    const cartCookie = cookies.cart_items;
    let cartItems = [];
    
    if (cartCookie) {
      try {
        cartItems = JSON.parse(decodeURIComponent(cartCookie));
      } catch (error) {
        cartItems = [];
      }
    }

    // Refresh product data for all cart items
    if (cartItems.length > 0) {
      await connectDB();
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        try {
          const product = await Product.findById(item.productId);
          if (product) {
            cartItems[i].name = product.name;
            cartItems[i].price = product.price;
            cartItems[i].image = product.image;
          }
        } catch (error) {
          console.error(`Error refreshing product data for ${item.productId}:`, error);
        }
      }
    }

    const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

    return NextResponse.json({
      items: cartItems,
      total,
      itemCount,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

