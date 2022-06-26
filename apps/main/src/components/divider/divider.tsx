import clsx from 'clsx';
import * as React from 'react';

import styles from './divider.module.scss';

export type DividerProps = React.ComponentPropsWithoutRef<'div'> & {
  vertical?: boolean;
};

export function Divider({
  vertical,
  className,
  ...divProps
}: DividerProps): JSX.Element {
  if (vertical) {
    return (
      <div
        role="separator"
        {...divProps}
        className={clsx('w-[1px]', 'bg-gray-500', className)}
      />
    );
  }
  return (
    <div
      role="separator"
      className={clsx(`relative w-auto max-w-full`, styles.divider, className)}
      {...divProps}
    />
  );
}
