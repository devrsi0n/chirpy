import clsx from 'clsx';
import * as React from 'react';

import { ring } from '../../styles/common';
import { BaseButton, BaseButtonProps } from './base-button';

export type IconButtonColor = 'gray' | 'primary' | 'green' | 'yellow' | 'red';
export type IconButtonProps = BaseButtonProps & {
  children?: React.ReactNode;
  /**
   * @default gray
   */
  color?: IconButtonColor;
};

export const IconButton = React.forwardRef(function IconButton(
  { children, className, color = 'gray', ...restProps }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  return (
    <BaseButton
      ref={ref}
      {...restProps}
      className={clsx(
        ring,
        `rounded-full hover:ring-4`,
        COLOR_STYLES[color],
        className,
      )}
    >
      {children}
    </BaseButton>
  );
});

const COLOR_STYLES: Record<IconButtonColor, string> = {
  gray: 'text-gray-1200 hover:bg-gray-400 hover:ring-gray-400',
  primary: 'text-primary-1100 hover:bg-primary-400 hover:ring-primary-400',
  green: 'text-green-1100 hover:bg-green-400 hover:ring-green-400',
  yellow: 'text-yellow-1100 hover:bg-yellow-400 hover:ring-yellow-400',
  red: 'text-red-1100 hover:bg-red-400 hover:ring-red-400',
};
