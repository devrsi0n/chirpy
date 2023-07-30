import { trpc } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, PricingCards, SiteLayout } from '../../blocks';
import { Heading, Text, useToast } from '../../components';
import { useCurrentUser } from '../../contexts';
import { triggerConfetti } from '../../hooks';

export type BillingsProps = {
  //
};

export function Billings(_props: BillingsProps): JSX.Element {
  const { data: user } = useCurrentUser();
  const { mutate } = trpc.payment.checkout.useMutation();
  const util = trpc.useContext();
  React.useEffect(() => {
    const url = new URL(location.href);
    if (url.searchParams.get('success') === 'true') {
      util.user.me.invalidate();
      url.searchParams.delete('success');
      triggerConfetti();
    }
  }, [util.user.me]);
  const { showToast } = useToast();

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
            children: user?.plan === 'HOBBY' ? 'Current plan' : 'Downgrade',
            onClick: () => {
              if (user?.plan === 'HOBBY') {
                showToast({
                  type: 'info',
                  title: 'You already in this plan',
                });
                return;
              }
            },
          }}
          payAsYouGoButton={{
            children: user?.plan === 'PRO' ? 'Current plan' : 'Upgrade',
            onClick: () => {
              if (user?.plan === 'PRO') {
                showToast({
                  type: 'info',
                  title: 'You already in this plan',
                });
                return;
              }
              mutate();
            },
          }}
        />
      </section>
    </SiteLayout>
  );
}
