import { getAppURL } from '@chirpy-dev/utils';

import { protectedProcedure, router } from '../trpc-server';
import { stripe } from '../common/stripe';
import { getPriceIdByPlanName } from '../services/payment/plan';

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
      success_url: `${getAppURL()}/dashboard/billings?success=true`,
      cancel_url: `${getAppURL()}/dashboard/billings?canceled=true`,
      automatic_tax: { enabled: true },
      customer_email: ctx.session.user.email,
      // Used by api/webhook/payment.ts
      client_reference_id: ctx.session.user.id,
    });
    return { sessionId: session.id };
  }),
});

