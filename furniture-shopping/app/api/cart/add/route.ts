import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productId, quantity = 1 } = await req.json();
    
    // Get user ID from cookies
    const cookieHeader = req.headers.get('cookie');
    const cookies = cookieHeader ? Object.fromEntries(
      cookieHeader.split(';').map(cookie => cookie.trim().split('='))
    ) : {};
    
    let userId = cookies.temp_user_id;
    
    if (!userId) {
      // Create new temporary user ID
      userId = "temp_user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    }

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
    
    // Check if item already exists
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
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