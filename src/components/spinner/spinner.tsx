import Loader from '@geist-ui/react-icons/loader';
import * as React from 'react';
import 'twin.macro';

export type SpinnerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <div
      tw="flex flex-row space-x-1 text-gray-1100"
      className={props.className}
      aria-label="Loading data"
    >
      <span tw="animate-spin">
        <Loader />
      </span>
      <span>{props.children || `Loading`}</span>
    </div>
  );
}
