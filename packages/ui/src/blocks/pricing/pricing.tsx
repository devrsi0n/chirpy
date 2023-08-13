import {
  getPlanPrice,
  PLANS,
} from '@chirpy-dev/trpc/src/services/payment/plan';
import { useRouter } from 'next/router';
import * as React from 'react';

import { IconCheck, IconX } from '../../components';
import { Button, ButtonProps } from '../../components/button';
import { Card } from '../../components/card';
import { Divider } from '../../components/divider';
import { Heading } from '../../components/heading';
import { SectionHeader } from '../../components/section-header';
import { Text } from '../../components/text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

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
  const hobby = getPlanPrice('HOBBY');
  const pro = getPlanPrice('PRO');
  return (
    <div className="flex w-full flex-col items-center space-y-4 md:flex-row md:items-stretch md:space-x-6 md:space-y-0">
      <PricingCard
        plan={PLANS[0].name}
        description="Perfect plan for those just starting out with their communities"
        price={
          <div className="flex flex-col gap-1">
            <h4 className="text-5xl font-semibold text-gray-1200">
              ${hobby.amount}/month
            </h4>
          </div>
        }
        callToAction={{
          variant: 'solid',
          color: 'gray',
          children: 'Try It Free',
          onClick: handleClickCTA,
          ...freePlanButton,
        }}
        benefits={[
          <div className="md:h-[80px]" key="pv">
            Up to {formateNum(hobby.pageviews)} pageviews per month
          </div>,
          '1 month analytics data retention',
          `${hobby.maxProjectNum} project`,
          'Privacy-first, No Ads',
          'Basic customization',
        ]}
      >
        {['Paste local images', 'No Chirpy branding', 'Priority support'].map(
          (benefit) => (
            <DisabledBenefit key={benefit}>{benefit}</DisabledBenefit>
          ),
        )}
      </PricingCard>
      <PricingCard
        plan={PLANS[1].name}
        description="Unblock next level communities with simple, usage based pricing"
        price={
          <div className="flex flex-col gap-1">
            <h4 className="text-5xl font-semibold text-gray-1200">
              ${pro.amount}/month
            </h4>
          </div>
        }
        benefits={[
          `${formateNum(pro.pageviews)} pageviews included`,
          '$5 / month for every additional 10K pageviews',
          '2 years analytics data retention',
          `Up to ${pro.maxProjectNum} projects`,
          'Privacy-first, No Ads',
          'Advanced customization',
          'Paste local images (comming soon)',
          'No Chirpy branding',
          'Priority support',
        ]}
        callToAction={{
          variant: 'solid',
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
  children?: React.ReactNode;
};

function PricingCard({
  plan,
  description,
  price,
  benefits,
  callToAction,
  children,
}: PricingCardProps): JSX.Element {
  return (
    <Card className="max-w-sm p-6">
      <Heading as="h5" className="mb-4 font-medium">
        {plan}
      </Heading>
      <Text className="mb-8" variant="secondary">
        {description}
      </Text>
      <div className="mb-6">{price}</div>
      <Button {...callToAction} className="mb-8 w-full" />
      <Divider className="-mx-6 mb-8 max-w-none" />
      <Text bold variant="secondary">{`WHAT'S INCLUDED`}</Text>
      <ul className="mt-3 flex flex-col gap-3">
        {benefits?.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="rounded-full bg-green-400 p-1 text-green-1000">
              <IconCheck size={14} strokeWidth={3} />
            </span>
            <span>{benefit}</span>
          </li>
        ))}
        {children}
      </ul>
    </Card>
  );
}

interface DisabledBenefitProps {
  children: React.ReactNode;
}
function DisabledBenefit({ children }: DisabledBenefitProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="rounded-full bg-gray-400 p-1 text-gray-1000">
        <IconX size={14} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function formateNum(num: number) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
  }).format(num);
}
