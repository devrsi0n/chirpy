import clsx from 'clsx';
import * as React from 'react';

import { IIconProps } from './types';

export interface FeatureIconProps extends IIconProps {
  children: JSX.Element;
}

/**
 * Feature icon accepts a single icon as a child, and overlap it with existing icons
 * @param props
 * @returns
 */
export function FeatureIcon(props: FeatureIconProps): JSX.Element {
  // Force the icon size
  const children = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      size: 24,
    });
  });
  return (
    <div className={clsx('relative w-[66px]', props.className)}>
      <svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        <path
          d="M5 33C5 17.536 17.536 5 33 5V5C48.464 5 61 17.536 61 33V33C61 48.464 48.464 61 33 61V61C17.536 61 5 48.464 5 33V33Z"
          fill="currentColor"
          className="text-primary-400"
        />
        <path
          d="M33 56C20.2975 56 10 45.7025 10 33H0C0 51.2254 14.7746 66 33 66V56ZM56 33C56 45.7025 45.7025 56 33 56V66C51.2254 66 66 51.2254 66 33H56ZM33 10C45.7025 10 56 20.2975 56 33H66C66 14.7746 51.2254 0 33 0V10ZM33 0C14.7746 0 0 14.7746 0 33H10C10 20.2975 20.2975 10 33 10V0Z"
          fill="currentColor"
          className="text-primary-300"
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-900">
        {children}
      </span>
    </div>
  );
}
