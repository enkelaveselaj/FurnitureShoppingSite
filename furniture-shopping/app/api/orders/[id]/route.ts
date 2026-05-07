import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    await connectDB();

    // Find and delete the payment/order
    let payment;
    if (session.user.role === "admin") {
      // Admin can delete any order
      payment = await Payment.findOneAndDelete({ _id: id });
    } else {
      // Regular users can only delete their own orders
      payment = await Payment.findOneAndDelete({
        _id: id,
        userId: session.user.id,
      });
    }

    if (!payment) {
      return NextResponse.json({ error: "Order not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Order deleted successfully",
      orderId: id
    });

  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
