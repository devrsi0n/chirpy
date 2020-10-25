import * as React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary';

export type ITextProps = React.PropsWithChildren<
  React.ComponentProps<'p'> & {
    variant?: Variant;
    as?: 'p' | 'span';
    bold?: boolean;
    italic?: boolean;
  }
>;

const variantStyles: Record<Variant, string> = {
  primary: 'text-text',
  secondary: 'text-text-secondary',
};

export function Text({
  variant = 'primary',
  as: Tag = 'p',
  children,
  className = '',
  bold,
  italic,
  ...restProps
}: ITextProps): JSX.Element {
  return (
    <Tag
      {...restProps}
      className={clsx(variantStyles[variant], bold && 'font-bold', italic && 'italic', className)}
    >
      {children}
    </Tag>
  );
}
