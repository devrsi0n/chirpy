import * as React from 'react';

import { Button, ButtonProps } from '$/components/button';
import { Card } from '$/components/card';
import { Divider } from '$/components/divider';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { List } from '$/components/list';
import { SectionHeader } from '$/components/section-header';
import { Text } from '$/components/text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

const COMMON_BENEFITS = [
  'Privacy-first, No Ads',
  'Rich text formatting',
  'Markdown shortcuts',
  'Third party sign in',
  'Advanced analytics',
  'Widget customization',
];

export function Pricing({ id }: PricingProps): JSX.Element {
  return (
    <div id={id} className="flex flex-col items-center px-8">
      <SectionHeader
        label="Pricing"
        title="Simple, transparent pricing"
        description="Simple, transparent pricing that grows with you. Try a free plan, and upgrade at anytime."
      />
      <div className="flex w-full flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
        <PricingCard
          plan="Hobby"
          price="0"
          callToAction={{
            label: 'Try It Free',
          }}
          benefits={['1 Website', ...COMMON_BENEFITS]}
        />
        <PricingCard
          plan="Pro"
          price="0"
          benefits={[
            <span key="website">
              <span className="font-bold text-gray-1200">10</span> Websites
            </span>,
            ...COMMON_BENEFITS,
            'Comment with image',
            'No branding',
          ]}
          callToAction={{
            label: 'Get started',
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
      <Heading as="h5" className="mb-4 font-medium">
        {plan}
      </Heading>
      <Text className="mb-8" variant="secondary">
        All the basics for starting a new community
      </Text>
      <Text className="mb-2 text-3xl">
        <span className="font-bold">${price}</span>
        <Text as="span" variant="secondary" size="base">
          /mo
        </Text>
      </Text>
      <Text className="mb-8" variant="secondary">
        {priceDescription}&#8203;
      </Text>
      <Link variant="plain" href="/auth/sign-in" tabIndex={-1}>
        <Button
          {...callToAction.buttonProps}
          variant="solid"
          className="mb-8 w-full"
        >
          {callToAction.label}
        </Button>
      </Link>
      <Divider className="-mx-6 mb-8 max-w-none" />
      <Text bold className="mb-3" variant="secondary">{`WHAT'S INCLUDED`}</Text>
      <List className="space-y-2">
        {benefits?.map((benefit, index) => (
          <List.Item key={index}>{benefit}</List.Item>
        ))}
      </List>
    </Card>
  );
}
