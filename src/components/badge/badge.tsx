import clsx from 'clsx';
import * as React from 'react';

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
      className={clsx(`p-1 rounded text-xs`, variantColorStyles[`${variant}-${color}`], className)}
    >
      {children}
    </span>
  );
}

type VariantColor = `${BadgeVariant}-${BadgeColor}`;

type VariantColors = Record<VariantColor, string>;

const variantColorStyles: VariantColors = {
  'default-primary': `bg-primary-600 text-primary-1100`,
  'default-blue': `bg-blue-600 text-blue-1100`,

  'solid-primary': `bg-primary-900 text-white`,
  'solid-blue': `bg-blue-900 text-white`,
};
