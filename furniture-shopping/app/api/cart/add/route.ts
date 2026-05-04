import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    // Check authentication
    let session;
    try {
      // Check if session cookie exists
      const cookieHeader = req.headers.get('cookie');
      console.log("Cart API - Cookie header:", cookieHeader);
      
      session = await getServerSession(authOptions);
      console.log("Cart API - Session check:", { 
        session: session ? "exists" : "null", 
        hasUser: !!session?.user, 
        userId: session?.user?.id,
        userName: session?.user?.name,
        cookies: cookieHeader
      });
      
      if (!session || !session.user) {
        console.log("Cart API - Authentication failed - no session or user");
        return NextResponse.json(
          { error: "Authentication required - please login" },
          { status: 401 }
        );
      }
      
      if (!session.user.id) {
        console.log("Cart API - Authentication failed - no user ID");
        return NextResponse.json(
          { error: "Invalid user session" },
          { status: 401 }
        );
      }
    } catch (sessionError) {
      console.error("Cart API - Session check error:", sessionError);
      return NextResponse.json(
        { error: "Session verification failed" },
        { status: 500 }
      );
    }

    const { productId, quantity = 1 } = await req.json();
    
    // Get user ID from session
    const userId = session!.user.id;

    // Get current cart items from cookie
    let cartItems = [];
    const cookieHeader = req.headers.get('cookie');
    const cookies = cookieHeader ? Object.fromEntries(
      cookieHeader.split(';').map(cookie => cookie.trim().split('='))
    ) : {};
    const cartCookie = cookies.cart_items;
    
    if (cartCookie) {
      try {
        cartItems = JSON.parse(decodeURIComponent(cartCookie));
      } catch (error) {
        cartItems = [];
      }
    }
    
    // Check if item already exists
    const existingItemIndex = cartItems.findIndex((item: any) => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item (we'll need product details - for now create a simple item)
      const newItem = {
        productId,
        quantity,
        name: "Product " + productId, // We'll need to fetch actual product details
        price: 450, // Default price - we'll need to fetch actual product
        image: "https://via.placeholder.com/300"
      };
      cartItems.push(newItem);
    }

    const response = NextResponse.json({ 
      success: true, 
      userId, 
      productId, 
      quantity,
      cartItems
    });
    
    // Set temporary user ID cookie
    response.headers.set('Set-Cookie', `temp_user_id=${userId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`); // 30 days
    
    // Set cart items cookie
    const cartCookieValue = encodeURIComponent(JSON.stringify(cartItems));
    response.headers.set('Set-Cookie', `cart_items=${cartCookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`); // 30 days
    
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Error adding to cart", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}