import { sendUpgradePlanEmail } from '@chirpy-dev/react-email';
import { getPlanByPriceId, prisma, stripe, Stripe } from '@chirpy-dev/trpc';
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
    log.debug(`stripe webhook type: ${event.type}`);
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
        if (checkoutSession.metadata?.quotion) {
          return res.status(200).end();
        }
        const customerId = getCustomerId(checkoutSession.customer);
        if (!checkoutSession.client_reference_id || !customerId) {
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
            billingCycleDay: new Date().getUTCDate(),
          },
        });
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        if (subscription.metadata?.quotion) {
          return res
            .status(200)
            .json({ message: 'Ignored Quotion subscription' });
        }
        const priceId = subscription.items.data[0].price.id;
        const plan = getPlanByPriceId(priceId);
        if (!plan) {
          log.info(
            `Cant find the plan from webhook:\n${subscription.items.data}`,
          );
          return res.status(200).json({
            message: `Can't find the plan for priceId:${priceId}. Ignored`,
          });
        }
        const customerId = getCustomerId(subscription.customer);
        const subscriptionId = getSubscriptionItemId(subscription);
        if (!subscriptionId || !customerId) {
          const msg = `Missing subscriptionId(${subscription}) or customer${subscription.customer} in Stripe webhook ${event.type}`;
          log.error(msg);
          return res.status(400).json({
            error: msg,
          });
        }
        const user = await prisma.user.update({
          where: {
            stripeCustomerId: customerId,
          },
          data: {
            plan: plan.type,
            stripeSubscriptionId: subscriptionId,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
        if (!user.email) {
          const msg = `Can't find the user or email with subscriptionId(${subscriptionId})`;
          log.error(msg);
          return res.status(400).json({
            error: msg,
          });
        }
        await sendUpgradePlanEmail({
          to: {
            name: user.name || '',
            email: user.email,
          },
          plan: 'Pro',
        });
        break;
      }
      case 'customer.subscription.deleted': {
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        if (subscriptionDeleted.metadata?.quotion) {
          return res
            .status(200)
            .json({ message: 'Ignored Quotion subscription' });
        }
        const subscriptionId = getSubscriptionItemId(subscriptionDeleted);
        const user = await prisma.user.update({
          where: {
            stripeSubscriptionId: subscriptionId,
          },
          data: {
            plan: 'HOBBY',
            stripeSubscriptionId: null,
            stripeCustomerId: null,
            billingCycleDay: null,
          },
          select: {
            id: true,
            name: true,
          },
        });
        if (!user?.id) {
          log.info(
            `Can't find the user in Stripe webhook(customer.subscription.deleted): ${subscriptionDeleted}`,
          );
          return res.status(200).json({
            message: `Can't find the user in Stripe webhook(customer.subscription.deleted): ${subscriptionDeleted}. Ignored`,
          });
        }
        log.warn(`User(${user.name}) has canceled their subscription`);
        break;
      }
      default: {
        console.log(`Unhandled event type ${event.type}.`);
      }
    }
    res.status(200).end();
  } catch (error) {
    log.error(
      `Handle stripe webhook event failed, error: ${error}, event:`,
      event,
    );
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

function getSubscriptionItemId(sub: Stripe.Subscription) {
  return sub.items.data[0].id;
}
