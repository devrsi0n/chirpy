import clsx from 'clsx';
import * as React from 'react';

import { IconLoader } from '../icons';

export type SpinnerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <div
      className={clsx(
        'flex flex-row space-x-1 text-gray-1100',
        props.className,
      )}
      aria-label="Loading data"
    >
      <IconLoader className="animate-spin" />
      <span>{props.children || `Loading`}</span>
    </div>
  );
}
