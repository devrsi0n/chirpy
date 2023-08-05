import { trpc } from '@chirpy-dev/trpc/src/client';
import { useRouter } from 'next/router';
import * as React from 'react';

import { PageTitle, PricingCards, SiteLayout } from '../../blocks';
import {
  Heading,
  IconExternalLink,
  Link,
  Text,
  useToast,
} from '../../components';
import { useCurrentUser } from '../../contexts';
import { triggerConfetti } from '../../hooks';
import { getStripe } from '../../utilities/stripe';

export type BillingsProps = {
  //
};

export function Billings(_props: BillingsProps): JSX.Element {
  const { data: user } = useCurrentUser();
  const { mutate } = trpc.payment.checkout.useMutation({
    async onSuccess(data) {
      const stripe = await getStripe();
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  });
  const util = trpc.useContext();
  const { showToast } = useToast();
  const router = useRouter();
  React.useEffect(() => {
    const url = new URL(location.href);
    if (url.searchParams.get('success') === 'true') {
      url.searchParams.delete('success');
      triggerConfetti();
      showToast({
        type: 'success',
        title: 'Thank you for upgrading',
        description:
          'Please wait several minutes for us to process your request',
      });
      // Update plan info after the webhook process
      setTimeout(() => {
        util.user.me.invalidate();
      }, 60_000);
      router.replace(url.href);
    } else if (url.searchParams.get('canceled') === 'true') {
      showToast({
        type: 'info',
        title: 'You have canceled the payment',
      });
      url.searchParams.delete('canceled');
      router.replace(url.href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data: customerPortal } = trpc.payment.customerPortal.useQuery();
  return (
    <SiteLayout title="Billings">
      <PageTitle>Billings</PageTitle>
      <section className="mt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <Heading as="h3">Plans</Heading>
          <Text variant="secondary">
            {`Upgrade or cancel your plan at any time and we'll refund you the difference already paid`}
          </Text>
          <PricingCards
            freePlanButton={{
              children: user?.plan === 'HOBBY' ? 'Current plan' : 'Downgrade',
              onClick: async () => {
                if (user?.plan === 'HOBBY') {
                  showToast({
                    type: 'info',
                    title: 'You already in this plan',
                  });
                  return;
                } else {
                  window.open(customerPortal?.portalUrl, '_blank')?.focus();
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
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={customerPortal?.portalUrl || ''}
            target="_blank"
            variant="plain"
            className="flex items-center gap-1 text-lg font-semibold text-gray-1200 hover:underline"
          >
            <span>Stripe portal</span>
            <IconExternalLink size={16} strokeWidth={2} />
          </Link>
          <Text variant="secondary">
            Check your payment method and invoices
          </Text>
        </div>
      </section>
    </SiteLayout>
  );
}
