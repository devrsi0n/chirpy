import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { ring } from '$/styles/common';

import { BaseButton, BaseButtonProps } from './BaseButton';

type Size = 'sm' | 'md' | 'lg';

export type IconButtonProps = BaseButtonProps & {
  size?: Size;
  children?: React.ReactNode;
};

const sizeStyles: Record<Size, TwStyle> = {
  sm: tw`p-1`,
  md: tw`p-2`,
  lg: tw`p-3`,
};

export const IconButton = React.forwardRef(function IconButton(
  { size = 'md', children, ...restProps }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const style = sizeStyles[size];
  return (
    <BaseButton
      ref={ref}
      {...restProps}
      css={[ring, tw`hover:(bg-gray-400) rounded-full text-gray-1100`, style]}
    >
      {children}
    </BaseButton>
  );
});
