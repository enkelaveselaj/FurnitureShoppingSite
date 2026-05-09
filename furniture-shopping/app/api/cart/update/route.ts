import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { productId, quantity } = await request.json();
    
    // Get cart items from cookies
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookieHeader ? Object.fromEntries(
      cookieHeader.split(';').map(cookie => cookie.trim().split('='))
    ) : {};

    // Get current cart items from cookie
    let cartItems = [];
    const cartCookie = cookies.cart_items;
    
    if (cartCookie) {
      try {
        cartItems = JSON.parse(decodeURIComponent(cartCookie));
      } catch (error) {
        cartItems = [];
      }
    }
    
    // Find and update the item
    const itemIndex = cartItems.findIndex((item: any) => item.productId === productId);
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cartItems.splice(itemIndex, 1);
    } else {
      // Update quantity
      cartItems[itemIndex].quantity = quantity;
    }

    const response = NextResponse.json({ 
      success: true, 
      productId, 
      quantity,
      cartItems
    });
    
    // Set cart items cookie
    const cartCookieValue = encodeURIComponent(JSON.stringify(cartItems));
    response.headers.set('Set-Cookie', `cart_items=${cartCookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`); // 30 days
    
    return response;
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Error updating cart", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}