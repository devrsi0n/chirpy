import Loader from '@geist-ui/react-icons/loader';
import * as React from 'react';


export type SpinnerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <div
      className="flex flex-row space-x-1 text-gray-1100"
      className={props.className}
      aria-label="Loading data"
    >
      <span className="animate-spin">
        <Loader />
      </span>
      <span>{props.children || `Loading`}</span>
    </div>
  );
}
