import { getPlanByPriceId, isNewCustomer, prisma, stripe, Stripe } from '@chirpy-dev/trpc';
import cors from 'cors';
import { buffer } from 'micro';
import { AxiomAPIRequest, withAxiom } from 'next-axiom';

import { getAPIHandler } from '../../../server/common/api-handler';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = getAPIHandler();
handler.use(cors);

handler.post(async (req: AxiomAPIRequest, res) => {
  const log = req.log.with({
    scope: 'webhook-payment',
  });
  let event: Stripe.Event;

  // Get the signature sent by Stripe
  const signature = req.headers['stripe-signature'];
  if (typeof signature !== 'string') {
    return res.status(400).json({
      error: 'missing the stripe-signature header',
    });
  }
  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      signature,
      process.env.STRIPE_SIGN_SECRET,
    );
  } catch (error) {
    log.error(`⚠️  Webhook signature verification failed.`, error as Error);
    return res.status(400).json({
      error: 'signature verification failed',
    });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      if (!checkoutSession.client_reference_id || !checkoutSession.customer) {
        log.error(
          `Missing client_reference_id(${checkoutSession.client_reference_id}) or customer(${checkoutSession.customer}) in Stripe webhook ${event.type}`,
        );
        return res.status(400).json({
          error: 'missing client_reference_id or customer',
        });
      }
      await prisma.user.update({
        where: {
          id: checkoutSession.client_reference_id,
        },
        data: {
          stripeId: checkoutSession.customer.toString(),
          billingCycleDay: new Date().getUTCDate(),
        },
      });
      break;
    }
    case 'customer.subscription.updated': {
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      const priceId = subscriptionUpdated.items.data[0].price.id;
      const plan = getPlanByPriceId(priceId);
      if (!plan) {
        return res
          .status(400)
          .json({ error: `Can't find the plan for priceId${priceId}` });
      }
      const stripeId = subscriptionUpdated.customer.toString();
      // If a user upgrades/downgrades their subscription, update their usage limit in the database.
      const data = await prisma.user.update({
        where: {
          stripeId,
        },
        data: {
          plan: plan.type,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!data) {
        return res
          .status(400)
          .json({
            error: `User(stripeId: ${stripeId}) not found in Stripe webhook ${event.type}`,
          });
      }
      if(isNewCustomer(event.data.previous_attributes)) {

      }
      break;
    }
    default: {
      log.warn(`Unhandled event type ${event.type}.`);
    }
  }

  res.status(200).end();
});

export default withAxiom(handler);
