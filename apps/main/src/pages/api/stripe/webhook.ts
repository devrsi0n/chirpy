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

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const customerId = getCustomerId(checkoutSession.customer);
        const subscriptionId = getSubscriptionId(checkoutSession.subscription);
        if (
          !checkoutSession.client_reference_id ||
          !customerId ||
          !subscriptionId
        ) {
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
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
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
        const subscriptionId = getSubscriptionId(subscriptionUpdated);
        if (!subscriptionId) {
          log.error(
            `subscriptionId(${subscriptionUpdated}) in Stripe webhook ${event.type}`,
          );
          return res.status(400).json({
            error: `Missing subscriptionId(${subscriptionUpdated.customer}) in Stripe webhook ${event.type}`,
          });
        }
        const user = await prisma.user.update({
          where: {
            stripeSubscriptionId: subscriptionId,
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
          log.error(
            `Can't find the user or email with subscriptionId(${subscriptionUpdated})`,
          );
          return res.status(400).json({
            error: `User(subscriptionId(${subscriptionUpdated})) not found in Stripe webhook ${event.type}`,
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
        console.log(`Unhandled event type ${event.type}.`);
      }
    }

    res.status(200).end();
  } finally {
    await log.flush();
  }
}

function getCustomerId(customer: Stripe.Checkout.Session['customer']) {
  if (typeof customer === 'string') {
    return customer;
  } else if (customer?.id) {
    return customer.id;
  }
}

function getSubscriptionId(sub: Stripe.Checkout.Session['subscription']) {
  if (typeof sub === 'string') {
    return sub;
  } else if (sub?.id) {
    return sub.id;
  }
}
