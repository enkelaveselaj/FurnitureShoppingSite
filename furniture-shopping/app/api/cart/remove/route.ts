import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    
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
    
    // Find and remove the item
    const itemIndex = cartItems.findIndex((item: any) => item.productId === productId);
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    cartItems.splice(itemIndex, 1);

    const response = NextResponse.json({ 
      success: true, 
      productId,
      cartItems
    });
    
    // Set cart items cookie
    const cartCookieValue = encodeURIComponent(JSON.stringify(cartItems));
    response.headers.set('Set-Cookie', `cart_items=${cartCookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`); // 30 days
    
    return response;
  } catch (error) {
    console.error("Error removing item:", error);
    return NextResponse.json({ error: "Error removing item", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}