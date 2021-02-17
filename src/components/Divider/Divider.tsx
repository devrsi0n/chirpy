import clsx from 'clsx';
import * as React from 'react';

import styles from './style.module.scss';

export type DividerProps = React.ComponentPropsWithoutRef<'div'>;

export function Divider({ className, style, ...divProps }: DividerProps): JSX.Element {
  return (
    <>
      <div
        role="separator"
        className={clsx('w-auto max-w-full relative', styles.hairlines, className)}
        style={style}
        {...divProps}
      />
    </>
  );
}
