import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    // Get user ID from cookies
    const cookieHeader = req.headers.get('cookie');
    const cookies = cookieHeader ? Object.fromEntries(
      cookieHeader.split(';').map(cookie => cookie.trim().split('='))
    ) : {};
    
    const userId = cookies.temp_user_id;
    
    if (!userId) {
      return NextResponse.json({ error: "No user found" }, { status: 401 });
    }

    const response = NextResponse.json({ 
      success: true,
      message: "Cart cleared"
    });
    
    // Clear cart items cookie by setting it to expire
    response.headers.set('Set-Cookie', 'cart_items=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
    
    return response;
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Error clearing cart", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
