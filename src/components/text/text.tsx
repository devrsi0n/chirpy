import clsx from 'clsx';
import * as React from 'react';

import { Box, BoxProps } from '../box';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type Variant = 'primary' | 'secondary';

export type TextProps = React.PropsWithChildren<
  React.ComponentProps<'p'> & {
    variant?: Variant;
    size?: Size;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    disabled?: boolean;
  }
> &
  BoxProps;

const sizeStyles: Record<Size, string> = {
  xs: `text-xs`,
  sm: `text-sm`,
  base: `text-base`,
  lg: `text-lg`,
  xl: `text-xl`,
};

export function Text({
  variant = 'primary',
  size = 'base',
  as: Tag,
  children,
  className,
  bold,
  italic,
  underline,
  disabled,
  ...restProps
}: TextProps): JSX.Element {
  if (!Tag) {
    if (bold) {
      Tag = 'strong';
    } else if (italic) {
      Tag = 'em';
    } else if (underline) {
      Tag = 'u';
    } else {
      Tag = 'p';
    }
  }

  return (
    <Box
      as={Tag}
      {...restProps}
      className={clsx(
        `leading-normal text-gray-1200`,
        variant === 'primary' ? `text-gray-1200` : `text-gray-1100`,
        sizeStyles[size],
        bold && `font-bold`,
        italic && `italic`,
        disabled && `text-gray-1100`,
        underline && `underline`,
        className,
      )}
    >
      {children}
    </Box>
  );
}
