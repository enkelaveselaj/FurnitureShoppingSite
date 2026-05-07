import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import Stripe from 'stripe';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    await connectDB();

    // Find the payment record
    const payment = await Payment.findOne({ sessionId });
    
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Initialize Stripe to verify the session
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    });

    // Verify the Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status === 'paid') {
      // Update payment status to completed
      payment.status = 'completed';
      await payment.save();
    }

    return NextResponse.json({
      sessionId: payment.sessionId,
      amount: payment.amount,
      customerEmail: payment.customerEmail,
      status: payment.status,
      items: payment.items,
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
