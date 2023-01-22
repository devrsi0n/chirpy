import * as RadixTabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import * as React from 'react';

export type TabsProps = RadixTabs.TabsProps &
  React.RefAttributes<HTMLDivElement>;

export function Tabs(props: TabsProps): JSX.Element {
  return (
    <RadixTabs.Root
      {...props}
      className={clsx('flex flex-col', props.className)}
    />
  );
}
Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export type TabsListProps = RadixTabs.TabsListProps &
  React.RefAttributes<HTMLDivElement>;
function List(props: TabsListProps): JSX.Element {
  return (
    <RadixTabs.List
      {...props}
      className={clsx('flex w-fit border-b', props.className)}
    />
  );
}

export type TabsTriggerProps = RadixTabs.TabsTriggerProps &
  React.RefAttributes<HTMLButtonElement>;
function Trigger(props: TabsTriggerProps): JSX.Element {
  return (
    <RadixTabs.Trigger
      {...props}
      className={clsx(
        `flex items-center justify-center rounded-t p-3 leading-none transition hover:bg-primary-400 hover:text-primary-1100 data-[state=active]:text-primary-1100`,
        // Use shadow as bottom border to avoid affecting layout
        `data-[state=active]:shadow-[inset_0_-1px_0_0_currentColor,0_1px_0_0_currentColor]`,
        props.className,
      )}
    />
  );
}

export type TabsContentProps = RadixTabs.TabsContentProps &
  React.RefAttributes<HTMLDivElement>;
function Content(props: TabsContentProps): JSX.Element {
  return (
    <RadixTabs.Content
      {...props}
      className={clsx('flex flex-1', props.className)}
    />
  );
}
