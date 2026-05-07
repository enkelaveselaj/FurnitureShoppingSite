import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const DELETE = async (req: Request) => {
  try {
    // Get NextAuth session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
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
};
