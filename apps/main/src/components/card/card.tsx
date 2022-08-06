import clsx from 'clsx';
import * as React from 'react';

import { bluredBg } from '$/styles/common';

import { PolymorphicComponentProps, Box } from '../box';

type CustomComponentOwnProps = {
  /**
   * @default true
   */
  shadow?: boolean;
};

export type CustomComponentProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, CustomComponentOwnProps>;

export function Card<E extends React.ElementType>({
  shadow = true,
  className,
  ...restProps
}: CustomComponentProps<E>): JSX.Element {
  return (
    <Box
      className={clsx(
        bluredBg,
        `rounded border border-gray-400`,
        shadow && `shadow-xs hover:shadow-lg`,
        className,
      )}
      {...restProps}
    />
  );
}
