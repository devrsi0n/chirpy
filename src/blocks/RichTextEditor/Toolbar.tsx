import * as React from 'react';

// import { Divider } from '$/components/Divider';
import clsx from 'clsx';

export type ToolbarProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function Toolbar({ className, children, ...divProps }: ToolbarProps): JSX.Element {
  return (
    <div
      className={clsx('px-1 py-1 leading-none border rounded shadow-sm', className)}
      {...divProps}
    >
      {children}
    </div>
  );
}
