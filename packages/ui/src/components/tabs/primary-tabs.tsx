import * as RadixTabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import * as React from 'react';

export type PrimaryTabsProps = RadixTabs.TabsProps &
  React.RefAttributes<HTMLDivElement>;

export function PrimaryTabs(props: PrimaryTabsProps): JSX.Element {
  return (
    <RadixTabs.Root
      {...props}
      className={clsx('flex flex-col', props.className)}
    />
  );
}
PrimaryTabs.List = List;
PrimaryTabs.Trigger = Trigger;
PrimaryTabs.Content = Content;

export type PrimaryTabsListProps = RadixTabs.TabsListProps &
  React.RefAttributes<HTMLDivElement>;
function List(props: PrimaryTabsListProps): JSX.Element {
  return (
    <RadixTabs.List
      {...props}
      className={clsx('flex w-fit gap-2', props.className)}
    />
  );
}

export type PrimaryTabsTriggerProps = RadixTabs.TabsTriggerProps &
  React.RefAttributes<HTMLButtonElement>;
function Trigger(props: PrimaryTabsTriggerProps): JSX.Element {
  return (
    <RadixTabs.Trigger
      {...props}
      className={clsx(
        `flex items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-none transition hover:bg-primary-400 hover:text-primary-1100`,
        `data-[state=active]:bg-primary-300 data-[state=active]:text-primary-1100`,
        props.className,
      )}
    />
  );
}

export type PrimaryTabsContentProps = RadixTabs.TabsContentProps &
  React.RefAttributes<HTMLDivElement>;
function Content(props: PrimaryTabsContentProps): JSX.Element {
  return (
    <RadixTabs.Content
      {...props}
      className={clsx('flex flex-1', props.className)}
    />
  );
}
