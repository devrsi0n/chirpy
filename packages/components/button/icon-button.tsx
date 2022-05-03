import clsx from 'clsx';
import * as React from 'react';

import { ring } from '@chirpy/styles/common';

import { BaseButton, BaseButtonProps } from './base-button';

export type IconButtonProps = BaseButtonProps & {
  children?: React.ReactNode;
};

export const IconButton = React.forwardRef(function IconButton(
  { children, className, ...restProps }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  return (
    <BaseButton
      ref={ref}
      {...restProps}
      className={clsx(
        ring,
        `hover:bg-gray-400 hover:ring-4 hover:ring-gray-400 rounded-full text-gray-900`,
        className,
      )}
    >
      {children}
    </BaseButton>
  );
});
