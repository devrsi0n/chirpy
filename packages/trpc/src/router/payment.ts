import { getAppURL } from '@chirpy-dev/utils';
import Stripe from 'stripe';

import { protectedProcedure, router } from '../trpc-server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export const paymentRouter = router({
  checkout: protectedProcedure.mutation(async ({ ctx }) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
        },
      ],
      mode: 'subscription',
      success_url: `${getAppURL()}/dashboard/billings?success=true`,
      cancel_url: `${getAppURL()}/dashboard/billings?canceled=true`,
      automatic_tax: { enabled: true },
      customer_email: ctx.session.user.email,
    });
    return { sessionId: session.id };
  }),
});
