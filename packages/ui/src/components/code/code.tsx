import clsx from 'clsx';
import * as React from 'react';

export type CodeProps = React.PropsWithChildren<React.ComponentProps<'pre'>>;

export function Code({
  children,
  className,
  ...preProps
}: CodeProps): JSX.Element {
  return (
    <pre
      className={clsx(
        'whitespace-pre-wrap rounded-sm bg-gray-300 px-3 py-4 text-gray-1200',
        className,
      )}
      {...preProps}
    >
      <code>{children}</code>
    </pre>
  );
}
