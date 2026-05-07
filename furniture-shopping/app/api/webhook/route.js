import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("Event:", event.type);

  try {
    await connectDB();

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Update payment status
        await Payment.findOneAndUpdate(
          { sessionId: session.id },
          { 
            status: 'completed',
            stripePaymentIntentId: session.payment_intent,
            updatedAt: new Date()
          }
        );
        
        console.log(`Payment completed for session: ${session.id}`);
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        
        // Update payment status to cancelled
        await Payment.findOneAndUpdate(
          { sessionId: expiredSession.id },
          { 
            status: 'cancelled',
            updatedAt: new Date()
          }
        );
        
        console.log(`Payment expired for session: ${expiredSession.id}`);
        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object;
        
        // Find payment by payment intent ID and update status
        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          { 
            status: 'failed',
            updatedAt: new Date()
          }
        );
        
        console.log(`Payment failed for intent: ${paymentIntent.id}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
}