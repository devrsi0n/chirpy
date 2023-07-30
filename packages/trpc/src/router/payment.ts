import { getAppURL } from '@chirpy-dev/utils';
import { z } from 'zod';

import { stripe } from '../common/stripe';
import { getPriceIdByPlanName } from '../services/payment/plan';
import { protectedProcedure, router } from '../trpc-server';

export const paymentRouter = router({
  checkout: protectedProcedure.mutation(async ({ ctx }) => {
    const priceId = getPriceIdByPlanName('Pro');
    if (!priceId) {
      throw new Error(`Can't find the priceId`);
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
      throw new Error('Expect a checkout session url');
    }
    ctx.res.redirect(session.url);
  }),

  createPortal: protectedProcedure
    .input(
      z.object({
        stripeCustomerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: input.stripeCustomerId,
        return_url: `${getAppURL()}/dashboard/billings`,
      });
      ctx.res.redirect(portalSession.url);
    }),
});
