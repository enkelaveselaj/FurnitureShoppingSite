import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import { stripe } from "@/lib/stripe";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "Session ID required" }, { status: 400 });
    }

    await connectDB();

    // Retrieve payment from database
    const payment = await Payment.findOne({ sessionId }).populate("items.productId");

    if (!payment) {
      return Response.json({ error: "Payment not found" }, { status: 404 });
    }

    // Verify with Stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status === "paid") {
      // Update payment status if it's still pending
      if (payment.status === "pending") {
        payment.status = "completed";
        payment.stripePaymentIntentId = stripeSession.payment_intent;
        await payment.save();
      }
    }

    return Response.json({
      sessionId: payment.sessionId,
      amount: payment.amount,
      customerEmail: payment.customerEmail,
      status: payment.status,
      items: payment.items,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
