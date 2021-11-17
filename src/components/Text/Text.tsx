import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

type Size = 'xs' | 'sm' | 'base' | 'lg';
type Variant = 'primary' | 'secondary';

export type TextProps = React.PropsWithChildren<
  React.ComponentProps<'p'> & {
    variant?: Variant;
    size?: Size;
    as?: 'p' | 'span' | 'time' | 'u' | 'strong' | 'em' | 'small';
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    disabled?: boolean;
  }
>;

const sizeStyles: Record<Size, TwStyle> = {
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  base: tw`text-base`,
  lg: tw`text-lg`,
};

export function Text({
  variant = 'primary',
  size = 'base',
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
        tw`leading-normal text-gray-1200`,
        variant === 'primary' ? tw`text-gray-1200` : tw`text-gray-1100`,
        sizeStyles[size],
        bold && tw`font-bold`,
        italic && tw`italic`,
        disabled && tw`text-gray-1100`,
        underline && tw`underline`,
      ]}
      className={className}
    >
      {children}
    </Tag>
  );
}
