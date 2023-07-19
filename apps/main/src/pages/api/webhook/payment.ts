import { stripe } from '@chirpy-dev/trpc';
import { getAPIHandler } from '../../../server/common/api-handler';

const handler = getAPIHandler();
handler.post(async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse

  // Get the signature sent by Stripe
  const signature = request.headers['stripe-signature'];
  if (typeof signature !== 'string') {
    throw new Error(`Expect stripe signature http to be string`);
  }
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      process.env.STRIPE_SIGN_SECRET,
    );
  } catch (err) {
    console.log(
      `⚠️  Webhook signature verification failed.`,
      (err as Error).message,
    );
    return response.status(400).end();
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).end();
});

export default handler;
