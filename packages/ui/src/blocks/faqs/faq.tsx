import * as React from 'react';

import { Heading, FeatureIcon, Text } from '../../components';

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
    <div className="flex flex-col items-center px-4 sm:px-0">
      <div>
        <FeatureIcon className="mb-5">{props.children}</FeatureIcon>
        <Heading as="h4" className="mb-2 max-w-xs font-semibold">
          {props.title}
        </Heading>
        <Text variant="secondary" className="max-w-sm">
          {props.description}
        </Text>
      </div>
    </div>
  );
}
