import { useRouter } from 'next/router';
import * as React from 'react';

import { IconCheck } from '../../components';
import { Button, ButtonProps } from '../../components/button';
import { Card } from '../../components/card';
import { Divider } from '../../components/divider';
import { Heading } from '../../components/heading';
import { SectionHeader } from '../../components/section-header';
import { Text } from '../../components/text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

const COMMON_BENEFITS = [
  'Privacy-first, No Ads',
  'Advanced analytics',
  'Rich text formatting',
  'Markdown shortcuts',
  'Third party sign in',
  'Widget customization',
];

export function Pricing({ id }: PricingProps): JSX.Element {
  return (
    <div id={id} className="flex flex-col items-center px-8">
      <SectionHeader
        label="Pricing"
        title="Simple, usage based pricing"
        description="Simple, transparent pricing that grows with you. Try a free plan, and upgrade at anytime."
      />
      <PricingCards />
    </div>
  );
}

export type PricingCardsProps = {
  freePlanButton?: ButtonProps;
  payAsYouGoButton?: ButtonProps;
};

export function PricingCards({
  freePlanButton,
  payAsYouGoButton,
}: PricingCardsProps) {
  const router = useRouter();
  const handleClickCTA = () => {
    router.push('/auth/sign-in');
  };
  return (
    <div className="flex w-full flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
      <PricingCard
        plan="Hobby"
        description="All the basics for starting a new community"
        price={
          <div className="flex flex-col gap-1">
            <h4 className="text-5xl font-semibold text-gray-1200">Free</h4>
          </div>
        }
        callToAction={{
          children: 'Try It Free',
          onClick: handleClickCTA,
          ...freePlanButton,
        }}
        benefits={['Free up to 10k pageviews per month', ...COMMON_BENEFITS]}
      />
      <PricingCard
        plan="Pro"
        description="Unblock next level communities with simple, usage based pricing"
        price={
          <div className="flex flex-col gap-1">
            <h4 className="text-5xl font-semibold text-gray-1200">$6/month</h4>
          </div>
        }
        benefits={[
          '$5 / month for every additional 10k pageviews',
          ...COMMON_BENEFITS,
          'Comment with image',
          'No branding',
          'Priority support',
        ]}
        callToAction={{
          children: 'Get started',
          color: 'primary',
          onClick: handleClickCTA,
          ...payAsYouGoButton,
        }}
      />
    </div>
  );
}

type PricingCardProps = {
  plan: string;
  description: string;
  price: JSX.Element;
  callToAction: ButtonProps;
  benefits?: React.ReactNode[];
};

function PricingCard({
  plan,
  description,
  price,
  benefits,
  callToAction,
}: PricingCardProps): JSX.Element {
  return (
    <Card className="p-6">
      <Heading as="h5" className="mb-4 font-medium">
        {plan}
      </Heading>
      <Text className="mb-8" variant="secondary">
        {description}
      </Text>
      <div className="mb-6">{price}</div>
      <Button {...callToAction} variant="solid" className="mb-8 w-full" />
      <Divider className="-mx-6 mb-8 max-w-none" />
      <Text bold variant="secondary">{`WHAT'S INCLUDED`}</Text>
      <ul className="mt-3 flex flex-col gap-3">
        {benefits?.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="rounded-full bg-green-400 p-1 text-green-800">
              <IconCheck size={14} strokeWidth={3} />
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
