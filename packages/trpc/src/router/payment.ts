import { getAppURL } from '@chirpy-dev/utils';
import { TRPCError } from '@trpc/server';

import { prisma } from '../common/db-client';
import { stripe } from '../common/stripe';
import { getPriceId } from '../services/payment/plan';
import { protectedProcedure, router } from '../trpc-server';

export const paymentRouter = router({
  checkout: protectedProcedure.mutation(async ({ ctx }) => {
    const priceId = getPriceId('PRO');
    if (!priceId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Can't find the priceId`,
      });
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
        },
      ],
      mode: 'subscription',
      success_url: `${getAppURL()}/dashboard/billings?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getAppURL()}/dashboard/billings?canceled=true`,
      automatic_tax: { enabled: true },
      customer_email: ctx.session.user.email,
      // Used by api/webhook/payment.ts
      client_reference_id: ctx.session.user.id,
    });
    if (!session.url) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Expect a checkout session url',
      });
    }
    return { sessionId: session.id };
  }),
  upcomingInvoice: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUserStripeInfo(ctx.session.user.id);
    if (!user?.stripeSubscriptionId || !user?.stripeCustomerId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Can't find user's stripeSubscriptionId or stripeCustomerId`,
      });
    }
    const invoice = await stripe.invoices.retrieveUpcoming({
      customer: user.stripeCustomerId,
      subscription: user.stripeSubscriptionId,
    });
    return invoice.lines;
  }),
  customerPortal: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUserStripeInfo(ctx.session.user.id);
    if (!user?.stripeCustomerId) {
      return;
    }
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${getAppURL()}/dashboard/billings`,
    });
    return { url: portalSession.url };
  }),
});

async function getUserStripeInfo(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
    },
  });

  return user;
}
