import * as React from 'react';
import tw from 'twin.macro';

import { cardBg } from '$/styles/common';

import { PolymorphicComponentProps, Box } from '../box';

type CustomComponentOwnProps = {
  /**
   * @default true
   */
  shadow?: boolean;
};

export type CustomComponentProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  CustomComponentOwnProps
>;

export function Card<E extends React.ElementType>({
  shadow = true,
  ...restProps
}: CustomComponentProps<E>): JSX.Element {
  return (
    <Box
      css={[cardBg, tw`rounded border border-gray-400`, shadow && tw`shadow-sm hover:shadow-xl`]}
      {...restProps}
    />
  );
}
