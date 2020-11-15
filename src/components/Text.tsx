import * as React from 'react';
import clsx from 'clsx';

type Variant = 'xs' | 'sm' | 'md' | 'lg';

export type TextProps = React.PropsWithChildren<
  React.ComponentProps<'p'> & {
    variant?: Variant;
    as?: 'p' | 'span';
    bold?: boolean;
    italic?: boolean;
  }
>;

const variantStyles: Record<Variant, string> = {
  xs: 'text-xs font-medium',
  sm: 'text-sm font-normal',
  md: 'text-md font-normal',
  lg: 'text-lg font-normal',
};

export function Text({
  variant = 'md',
  as: Tag = 'p',
  children,
  className = '',
  bold,
  italic,
  ...restProps
}: TextProps): JSX.Element {
  return (
    <Tag
      {...restProps}
      className={clsx(
        'text-sans text-text',
        variantStyles[variant],
        bold && 'font-bold',
        italic && 'italic',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
