import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripe: Stripe;

export async function getStripe(): Promise<Stripe> {
  if (!stripe) {
    const stripeInstance = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripeInstance) {
      throw new Error(`Initialize stripe js failed`);
    }
    stripe = stripeInstance;
  }
  return stripe;
}
