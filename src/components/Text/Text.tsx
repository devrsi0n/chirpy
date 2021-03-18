import * as React from 'react';

import tw, { TwStyle } from 'twin.macro';

type Variant = 'xs' | 'sm' | 'base' | 'lg';

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

const variantStyles: Record<Variant, TwStyle> = {
  xs: tw`text-xs font-medium`,
  sm: tw`text-sm font-normal`,
  base: tw`text-base font-normal`,
  lg: tw`text-lg font-normal`,
};

export function Text({
  variant = 'base',
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
      css={[
        tw`font-sans leading-normal`,
        variantStyles[variant],
        bold && tw`font-bold`,
        italic && tw`italic`,
        disabled && tw`text-gray-500`,
        underline && tw`underline`,
      ]}
      className={className}
    >
      {children}
    </Tag>
  );
}
