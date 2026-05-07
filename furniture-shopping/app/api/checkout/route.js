import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

    await connectDB();

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: session.user.email,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart?cancelled=true`,
      metadata: {
        userId: session.user.id,
      },
    });

    // Create payment record in database
    const payment = await Payment.create({
      userId: session.user.id,
      sessionId: stripeSession.id,
      amount: totalAmount,
      currency: "usd",
      status: "pending",
      items: items,
      customerEmail: session.user.email,
      stripePaymentIntentId: stripeSession.payment_intent,
    });

    return Response.json({ 
      url: stripeSession.url,
      sessionId: stripeSession.id,
      paymentId: payment._id
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}