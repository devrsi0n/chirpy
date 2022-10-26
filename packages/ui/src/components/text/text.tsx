import clsx from 'clsx';
import * as React from 'react';

import { Box, BoxProps } from '../box';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type Variant = 'main' | 'secondary';
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
const colorVariantStyles: Record<`${Color}-${Variant}`, string> = {
  'gray-main': 'text-gray-1200',
  'gray-secondary': 'text-gray-1100',
  'primary-main': `text-primary-900`,
  'primary-secondary': 'text-primary-800',
};

export function Text({
  variant = 'main',
  color = 'gray',
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
        colorVariantStyles[`${color}-${variant}`],
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
