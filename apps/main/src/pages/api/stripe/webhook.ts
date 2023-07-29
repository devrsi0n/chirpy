import { sendUpgradePlanEmail } from '@chirpy-dev/react-email';
import {
  getPlanByPriceId,
  isNewCustomer,
  prisma,
  stripe,
  Stripe,
} from '@chirpy-dev/trpc';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { log as axiomLog } from 'next-axiom';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function stripeWebhook(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const log = axiomLog.with({
    scope: 'stripe-webhook',
  });
  let event: Stripe.Event;
  log.debug('stripe/webhook');

  // Get the signature sent by Stripe
  const signature = req.headers['stripe-signature'];
  if (typeof signature !== 'string') {
    log.debug(`Missing stripe signature`);
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
        log.error(
          `Cant find the plan from webhook:\n${subscriptionUpdated.items.data}`,
        );
        return res
          .status(400)
          .json({ error: `Can't find the plan for priceId${priceId}` });
      }
      const stripeId = subscriptionUpdated.customer.toString();
      const user = await prisma.user.update({
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
      if (!user.email) {
        log.error(`Can't find the user or email with stripeId:${stripeId}`);
        return res.status(400).json({
          error: `User(stripeId: ${stripeId}) not found in Stripe webhook ${event.type}`,
        });
      }
      if (isNewCustomer(event.data.previous_attributes)) {
        await sendUpgradePlanEmail({
          to: {
            name: user.name || '',
            email: user.email,
          },
          plan: 'Pro',
        });
      }
      break;
    }
    default: {
      log.warn(`Unhandled event type ${event.type}.`);
    }
  }

  log.debug(`Handle stripe webhook succeed`);
  res.status(200).end();
  await log.flush();
}
