import clsx from 'clsx';
import * as React from 'react';

import { IIconProps } from './types';

export type IconSwitchHorizontal01Props = IIconProps;

export function IconSwitchHorizontal01({
  size = 24,
  className,
}: IconSwitchHorizontal01Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
