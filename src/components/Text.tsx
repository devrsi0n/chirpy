import * as React from 'react';
import clsx from 'clsx';

type Variant = 'xs' | 'sm' | 'md' | 'lg';

export type TextProps = React.PropsWithChildren<
  React.ComponentProps<'p'> & {
    variant?: Variant;
    as?: 'p' | 'span' | 'time' | 'u' | 'strong' | 'em';
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    disabled?: boolean;
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
  as: Tag,
  children,
  className = '',
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
    <Tag
      {...restProps}
      className={clsx(
        'text-sans text-text',
        variantStyles[variant],
        bold && 'font-bold',
        italic && 'italic',
        disabled && 'text-gray-500',
        underline && 'underline',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
