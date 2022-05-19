import clsx from 'clsx';
import * as React from 'react';

import styles from '../analytics.module.scss';

export type CardProps = React.PropsWithChildren<{}>;

export function AnalyticsCard(props: CardProps): JSX.Element {
  return (
    <div className={clsx('stats-item--has-header mt-6 flex w-full flex-col', styles['stats-item'])}>
      <div
        className={clsx(
          'relative flex flex-grow flex-col rounded bg-white p-4 shadow-xl dark:bg-gray-825',
          styles['stats-item-header'],
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

export const ViewNumber = (props: React.PropsWithChildren<{}>) => (
  <span className="w-20 text-right font-medium text-gray-1200">{props.children}</span>
);
