import clsx from 'clsx';
import * as React from 'react';

import { Loader } from '../icons';

export type SpinnerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <div
      className={clsx('flex flex-row space-x-1 text-gray-1100', props.className)}
      aria-label="Loading data"
    >
      <span className="animate-spin">
        <Loader />
      </span>
      <span>{props.children || `Loading`}</span>
    </div>
  );
}
