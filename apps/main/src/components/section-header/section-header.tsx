import * as React from 'react';

import { Heading } from '../heading';
import { Text } from '../text';

export type SectionHeaderProps = {
  title: string;
  description: string;
  label: string;
};

/**
 * Landing page section header
 */
export function SectionHeader({
  title,
  description,
  label,
}: SectionHeaderProps): JSX.Element {
  return (
    <>
      <Text color="primary" className="mb-3 text-center font-semibold">
        {label}
      </Text>
      <Heading as="h2" className="mb-6 text-center text-5xl font-semibold">
        {title}
      </Heading>
      <Text variant="secondary" className="mb-24 text-center">
        {description}
      </Text>
    </>
  );
}
