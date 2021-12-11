import * as React from 'react';
import 'twin.macro';

export type CardProps = React.PropsWithChildren<{}>;

export function AnalyticsCard(props: CardProps): JSX.Element {
  return (
    <div className="stats-item flex flex-col mt-6 stats-item--has-header w-full">
      <div className="stats-item-header flex flex-col flex-grow relative p-4 bg-white rounded shadow-xl dark:bg-gray-825">
        {props.children}
      </div>
    </div>
  );
}

export const ViewNumber = (props: React.PropsWithChildren<{}>) => (
  <span tw="font-medium text-gray-1200 w-20 text-right">{props.children}</span>
);
