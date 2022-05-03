import clsx from 'clsx';
import * as React from 'react';

import { cardBg } from '@chirpy/styles/common';

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
  className,
  ...restProps
}: CustomComponentProps<E>): JSX.Element {
  return (
    <Box
      className={clsx(
        cardBg,
        `rounded border border-gray-400`,
        shadow && `shadow-sm hover:shadow-xl`,
        className,
      )}
      {...restProps}
    />
  );
}
