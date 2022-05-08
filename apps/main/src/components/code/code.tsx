import clsx from 'clsx';
import * as React from 'react';

export type CodeProps = React.PropsWithChildren<React.ComponentProps<'pre'>>;

export function Code({ children, className, ...preProps }: CodeProps): JSX.Element {
  return (
    <pre
      className={clsx(
        'py-6 px-3 bg-gray-300 text-gray-1200 rounded-sm whitespace-pre-wrap',
        className,
      )}
      {...preProps}
    >
      <code>{children}</code>
    </pre>
  );
}
