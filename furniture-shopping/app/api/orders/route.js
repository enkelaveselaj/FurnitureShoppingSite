import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectDB();

    let orders;

    if (session.user.role === "admin") {
      // Admin can see all orders
      orders = await Payment.find({})
        .sort({ createdAt: -1 });
    } else {
      // Regular users can only see their own orders
      orders = await Payment.find({ userId: session.user.id })
        .sort({ createdAt: -1 });
    }

    return NextResponse.json({ 
      orders: orders,
      count: orders.length
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
