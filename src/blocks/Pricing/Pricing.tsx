import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/Button';
import { Divider } from '$/components/Divider';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List, ListItem } from '$/components/List';
import { Text } from '$/components/Text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

export function Pricing({ id }: PricingProps): JSX.Element {
  return (
    <div id={id} tw="py-8 flex flex-col items-center">
      <Heading as="h2" tw="font-bold mb-4">
        Pricing Plans
      </Heading>
      <Text tw="text-gray-400 mb-8" variant="lg">
        Start building for free, then add a site to go live. Account plans unblock additional
        features.
      </Text>
      <div tw="flex flex-row space-x-6">
        <PricingCard
          plan="Hobby"
          price="0"
          callToAction={{
            label: 'Try It Free',
          }}
          benefits={[
            '1 Website',
            'Privacy-first, No Ads',
            'Basic rich text formatting',
            'Markdown support',
            'Third party sign in',
            'Basic analytics',
          ]}
        />
        <PricingCard
          plan="Pro"
          price="0"
          benefits={[
            <span key="website">
              <span tw="font-bold text-black">10</span> Websites
            </span>,
            'Privacy-first, No Ads',
            'Basic rich text formatting',
            'Markdown support',
            'Third party sign in',
            'Basic analytics',
            'Text formatting with image',
            'Widget customization',
            'No branding',
          ]}
          callToAction={{
            label: 'Buy Pro',
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
    <div tw="border p-6 rounded shadow hover:shadow-xl transition">
      <Heading as="h5" tw="font-medium mb-4">
        {plan}
      </Heading>
      <Text tw="mb-8 text-gray-400">All the basics for starting a new community</Text>
      <Text tw="text-3xl font-bold mb-2">
        ${price}
        <span tw="text-gray-300 text-base font-normal">/mo</span>
      </Text>
      <Text tw="text-gray-400 mb-8">{priceDescription}&#8203;</Text>
      <Link variant="plain" href="/auth/sign-in">
        <Button {...callToAction.buttonProps} variant="solid" tw="w-full mb-8">
          {callToAction.label}
        </Button>
      </Link>
      <Divider tw="-mx-6 max-w-none mb-8" />
      <Text tw="font-medium text-gray-600 mb-3" variant="sm">{`WHAT'S INCLUDED`}</Text>
      <List tw="space-y-2 text-gray-400">
        {benefits?.map((benefit, index) => (
          <ListItem key={index}>{benefit}</ListItem>
        ))}
      </List>
    </div>
  );
}
