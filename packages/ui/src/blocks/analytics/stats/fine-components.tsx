import clsx from 'clsx';
import * as React from 'react';

import { Heading } from '../../../components';
import styles from '../analytics.module.scss';

export type CardProps = React.PropsWithChildren<{}>;

export function AnalyticsCard(props: CardProps): JSX.Element {
  return (
    <div
      className={clsx(
        'stats-item--has-header mt-6 flex w-full flex-col',
        styles['stats-item'],
      )}
    >
      <div
        className={clsx(
          'relative flex flex-grow flex-col rounded bg-white p-4 shadow-lg dark:bg-gray-825',
          styles['stats-item-header'],
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

export const ViewNumber = (props: React.PropsWithChildren<{}>) => (
  <span className="w-20 text-right font-medium text-gray-1200">
    {props.children}
  </span>
);

export type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardHeader(props: CardHeaderProps): JSX.Element {
  return (
    <Heading as="h3" className="text-base font-bold">
      {props.children}
    </Heading>
  );
}
