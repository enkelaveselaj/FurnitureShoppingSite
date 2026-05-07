import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Fetch payments for the current user
    const payments = await Payment.find({ 
      userId: session.user.id 
    }).sort({ createdAt: -1 });

    return Response.json({ 
      orders: payments.map(payment => ({
        _id: payment._id,
        sessionId: payment.sessionId,
        amount: payment.amount,
        status: payment.status,
        customerEmail: payment.customerEmail,
        items: payment.items,
        createdAt: payment.createdAt,
      }))
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
