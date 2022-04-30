import clsx from 'clsx';
import * as React from 'react';

import styles from '../analytics.module.scss';

export type CardProps = React.PropsWithChildren<{}>;

export function AnalyticsCard(props: CardProps): JSX.Element {
  return (
    <div className={clsx('flex flex-col mt-6 stats-item--has-header w-full', styles['stats-item'])}>
      <div className={clsx("flex flex-col flex-grow relative p-4 bg-white rounded shadow-xl dark:bg-gray-825", styles['stats-item-header'])}>
        {props.children}
      </div>
    </div>
  );
}

export const ViewNumber = (props: React.PropsWithChildren<{}>) => (
  <span className="font-medium text-gray-1200 w-20 text-right">{props.children}</span>
);
