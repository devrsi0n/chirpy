import { trpc } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, PricingCards, SiteLayout } from '../blocks';
import { Heading, Text } from '../components';
import { getStripe } from '../utilities/stripe';

export type BillingsProps = {
  //
};

export function Billings(_props: BillingsProps): JSX.Element {
  const { mutate } = trpc.payment.checkout.useMutation({
    async onSuccess(data) {
      const stripe = await getStripe();
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  });

  return (
    <SiteLayout title="Billings">
      <PageTitle>Billings</PageTitle>
      <section className="mt-10 flex flex-col gap-6">
        <Heading as="h3">Plans</Heading>
        <Text variant="secondary">
          {`Upgrade or cancel your plan at any time and we'll refund you the difference already paid`}
        </Text>
        <PricingCards
          freePlanButton={{
            children: 'Current plan',
          }}
          payAsYouGoButton={{
            children: 'Upgrade',
            onClick: () => mutate(),
          }}
        />
      </section>
    </SiteLayout>
  );
}
