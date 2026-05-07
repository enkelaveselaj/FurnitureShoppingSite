// Simple test to verify Stripe configuration
import { stripe } from "./lib/stripe.js";

console.log("Testing Stripe configuration...");

try {
  // Test Stripe connection by retrieving account info
  stripe.accounts.retrieve()
    .then(account => {
      console.log("✅ Stripe connection successful!");
      console.log("Account ID:", account.id);
      console.log("Country:", account.country);
    })
    .catch(error => {
      console.error("❌ Stripe connection failed:", error.message);
    });
} catch (error) {
  console.error("❌ Stripe initialization error:", error.message);
}
