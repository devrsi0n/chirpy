import * as React from 'react';

import { Heading } from '$/components/heading';
import { FeatureIcon } from '$/components/icons';
import { Text } from '$/components/text';

export type FAQProps = {
  /**
   * Icon
   */
  children: JSX.Element;
  title: string;
  description: React.ReactNode;
};

export function FAQ(props: FAQProps): JSX.Element {
  return (
    <div>
      <FeatureIcon className="mb-5">{props.children}</FeatureIcon>
      <Heading as="h4" className="mb-2 font-semibold">
        {props.title}
      </Heading>
      <Text variant="secondary" className="max-w-sm">
        {props.description}
      </Text>
    </div>
  );
}
