import * as React from 'react';

import { Divider } from '$/components/Divider';
import clsx from 'clsx';

export type ToolbarProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function Toolbar({ className, children, ...divProps }: ToolbarProps): JSX.Element {
  return (
    <div className={clsx('pt-2', className)} {...divProps}>
      <div className="px-2 space-x-2">{children}</div>
      {/* <FormatButton format="underlined" icon="format_underlined" /> */}
      <Divider />
    </div>
  );
}
