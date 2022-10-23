import clsx from 'clsx';
import * as React from 'react';

import { IIconProps } from './types';

export interface IIconArrowProps extends IIconProps {
  //
}

export function IconArrow(props: IIconArrowProps): JSX.Element {
  return (
    <svg
      width={props.size ?? 100}
      viewBox="0 0 176 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(props.className, 'rotate-180')}
    >
      <path
        d="M3 109.032C12.9269 90.8896 27.5775 58.7965 53.0802 59.3761C72.6481 59.8208 78.7948 82.5425 89.8976 94.8142C120.301 128.418 149.852 41.639 159.501 24.1502C161.982 19.6522 168.018 -2.15518 169.262 7.17381C170.384 15.592 176.062 43.477 169.58 21.6037C167.726 15.3443 171.52 7.77959 165.336 3.14195C162.855 1.28128 140.05 18.2758 138.598 21.1793"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
