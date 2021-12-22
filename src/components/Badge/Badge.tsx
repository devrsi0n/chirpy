import * as React from 'react';
import 'twin.macro';

export type BadgeProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Badge({ className, children }: BadgeProps): JSX.Element {
  return (
    <span className={className} tw="p-1 rounded bg-primary-600 text-primary-1100 text-xs">
      {children}
    </span>
  );
}
