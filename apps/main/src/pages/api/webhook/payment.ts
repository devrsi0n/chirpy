import { stripe, Stripe } from '@chirpy-dev/trpc';
import cors from 'cors';
import { buffer } from 'micro';
import { log } from 'next-axiom';

import { getAPIHandler } from '../../../server/common/api-handler';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = getAPIHandler();
handler.use(cors);
handler.post(async (req, res) => {
  let event: Stripe.Event;

  // Get the signature sent by Stripe
  const signature = req.headers['stripe-signature'];
  if (typeof signature !== 'string') {
    throw new TypeError(`Expect stripe signature header to be string`);
  }
  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      signature,
      process.env.STRIPE_SIGN_SECRET,
    );
  } catch (error) {
    log.error(`⚠️  Webhook signature verification failed.`, { err: error });
    return res.status(400).end();
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      paymentIntent.customer;
      break;
    }
    case 'payment_method.attached': {
      // const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    }
    default: {
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
    }
  }

  res.status(200).end();
});

export default handler;
