import clsx from 'clsx';
import * as React from 'react';

export type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar(props: ProgressBarProps): JSX.Element {
  return (
    <div className={clsx('rounded-full bg-gray-500', props.className)}>
      <div
        className="h-2 rounded-full bg-primary-900"
        style={{
          width: `${props.value}%`,
        }}
      />
    </div>
  );
}
