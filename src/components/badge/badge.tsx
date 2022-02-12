import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type BadgeVariant = 'solid' | 'default';
type BadgeColor = 'primary' | 'blue';

export type BadgeProps = React.PropsWithChildren<{
  className?: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
}>;

export function Badge({
  className,
  children,
  variant = 'default',
  color = 'primary',
}: BadgeProps): JSX.Element {
  return (
    <span
      className={className}
      css={[tw`p-1 rounded text-xs`, variantColorStyles[`${variant}-${color}`]]}
    >
      {children}
    </span>
  );
}

type VariantColor = `${BadgeVariant}-${BadgeColor}`;

type VariantColors = Record<VariantColor, TwStyle>;

const variantColorStyles: VariantColors = {
  'default-primary': tw`bg-primary-600 text-primary-1100`,
  'default-blue': tw`bg-blue-600 text-blue-1100`,

  'solid-primary': tw`bg-primary-900 text-white`,
  'solid-blue': tw`bg-blue-900 text-white`,
};
