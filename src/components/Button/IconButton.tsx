import * as React from 'react';
import tw from 'twin.macro';

import { ring } from '$/styles/common';

import { BaseButton, BaseButtonProps } from './BaseButton';

export type IconButtonProps = BaseButtonProps & {
  children?: React.ReactNode;
};

export const IconButton = React.forwardRef(function IconButton(
  { children, ...restProps }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  return (
    <BaseButton
      ref={ref}
      {...restProps}
      css={[ring, tw`hover:(bg-gray-400 ring-4 ring-gray-400) rounded-full text-gray-900`]}
    >
      {children}
    </BaseButton>
  );
});
