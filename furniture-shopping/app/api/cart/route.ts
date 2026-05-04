import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

