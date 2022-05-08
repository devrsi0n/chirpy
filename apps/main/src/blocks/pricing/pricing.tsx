import * as React from 'react';

import { Button, ButtonProps } from '$/components/button';
import { Card } from '$/components/card';
import { Divider } from '$/components/divider';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { List } from '$/components/list';
import { Text } from '$/components/text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

const commonBenefits = [
  'Privacy-first, No Ads',
  'Rich text formatting',
  'Markdown shortcuts',
  'Third party sign in',
  'Advanced analytics',
  'Widget customization',
];

export function Pricing({ id }: PricingProps): JSX.Element {
  return (
    <div id={id} className="flex flex-col items-center">
      <Heading as="h2" className="mb-4 font-bold w-full text-left sm:text-center">
        Pricing Plans
      </Heading>
      <Text className="mb-8" variant="secondary" size="lg">
        Start building for free, then add a site to go live. Account plans unblock additional
        features.
      </Text>
      <div className="w-full flex flex-col items-start space-y-4 sm:items-center md:flex-row md:items-start md:space-x-6 md:space-y-0">
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
              <span className="font-bold text-gray-1200">10</span> Websites
            </span>,
            ...commonBenefits,
            'Comment with image',
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
    <Card className="p-6">
      <Heading as="h5" className="font-medium mb-4">
        {plan}
      </Heading>
      <Text className="mb-8" variant="secondary">
        All the basics for starting a new community
      </Text>
      <Text className="text-3xl mb-2">
        <span className="font-bold">${price}</span>
        <Text as="span" variant="secondary" size="base">
          /mo
        </Text>
      </Text>
      <Text className="mb-8" variant="secondary">
        {priceDescription}&#8203;
      </Text>
      <Link variant="plain" href="/auth/sign-in" tabIndex={-1}>
        <Button {...callToAction.buttonProps} variant="solid" className="w-full mb-8">
          {callToAction.label}
        </Button>
      </Link>
      <Divider className="-mx-6 max-w-none mb-8" />
      <Text bold className="mb-3" variant="secondary">{`WHAT'S INCLUDED`}</Text>
      <List className="space-y-2">
        {benefits?.map((benefit, index) => (
          <List.Item key={index}>{benefit}</List.Item>
        ))}
      </List>
    </Card>
  );
}
