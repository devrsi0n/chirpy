import clsx from 'clsx';
import * as React from 'react';

import { Box, BoxProps } from '../box';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type Variant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning';
export type Color = 'primary' | 'gray';

export type TextProps = React.PropsWithChildren<
  React.ComponentProps<'p'> & {
    /**
     * @default 'main'
     */
    variant?: Variant;
    /**
     * @default 'gray'
     */
    color?: Color;
    /**
     * @default 'base'
     */
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
const variantStyles: Record<Variant, string> = {
  default: 'text-gray-1200',
  primary: 'text-primary-900',
  secondary: 'text-gray-1100',
  success: 'text-green-900',
  error: 'text-red-900',
  warning: 'text-yellow-900',
};

export function Text({
  variant = 'default',
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
        `leading-normal`,
        variantStyles[variant],
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
