import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/Button';
import { Card } from '$/components/Card';
import { Divider } from '$/components/Divider';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List } from '$/components/List';
import { Text } from '$/components/Text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

const commonBenefits = [
  'Privacy-first, No Ads',
  'Rich text formatting',
  'Markdown shortcuts',
  'Third party sign in',
  'Basic analytics',
  'Widget customization',
];

export function Pricing({ id }: PricingProps): JSX.Element {
  return (
    <div id={id} tw="flex flex-col items-center">
      <Heading as="h2" tw="mb-4 font-bold w-full text-left sm:text-center">
        Pricing Plans
      </Heading>
      <Text tw="mb-8" variant="secondary" size="lg">
        Start building for free, then add a site to go live. Account plans unblock additional
        features.
      </Text>
      <div tw="w-full flex flex-col items-start space-y-4 sm:items-center md:(flex-row items-start space-x-6 space-y-0)">
        <PricingCard
          plan="Hobby"
          price="0"
          callToAction={{
            label: 'Try It Free',
          }}
          benefits={['1 Website', ...commonBenefits]}
        />
        <PricingCard
          plan="Pro"
          price="0"
          benefits={[
            <span key="website">
              <span tw="font-bold text-gray-1200">10</span> Websites
            </span>,
            ...commonBenefits,
            'Comment with image & video',
            'No branding',
          ]}
          callToAction={{
            label: 'Try It Free',
            buttonProps: {
              color: 'primary',
            },
          }}
          priceDescription="Free for now"
        />
      </div>
    </div>
  );
}

type PricingCardProps = {
  plan: string;
  price: string;
  callToAction: {
    label: string;
    buttonProps?: Partial<ButtonProps>;
  };
  priceDescription?: string;
  benefits?: React.ReactNode[];
};

function PricingCard({
  plan,
  price,
  benefits,
  callToAction,
  priceDescription,
}: PricingCardProps): JSX.Element {
  return (
    <Card tw="p-6">
      <Heading as="h5" tw="font-medium mb-4">
        {plan}
      </Heading>
      <Text tw="mb-8" variant="secondary">
        All the basics for starting a new community
      </Text>
      <Text tw="text-3xl mb-2">
        <span tw="font-bold">${price}</span>
        <Text as="span" variant="secondary" size="base">
          /mo
        </Text>
      </Text>
      <Text tw="mb-8" variant="secondary">
        {priceDescription}&#8203;
      </Text>
      <Link variant="plain" href="/auth/sign-in" tabIndex={-1}>
        <Button {...callToAction.buttonProps} variant="solid" tw="w-full mb-8">
          {callToAction.label}
        </Button>
      </Link>
      <Divider tw="-mx-6 max-w-none mb-8" />
      <Text bold tw="mb-3" variant="secondary">{`WHAT'S INCLUDED`}</Text>
      <List tw="space-y-2">
        {benefits?.map((benefit, index) => (
          <List.Item key={index}>{benefit}</List.Item>
        ))}
      </List>
    </Card>
  );
}
