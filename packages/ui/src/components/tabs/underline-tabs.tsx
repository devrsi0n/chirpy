import * as RadixTabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import * as React from 'react';

export type UnderlineTabsProps = RadixTabs.TabsProps &
  React.RefAttributes<HTMLDivElement>;

export function UnderlineTabs(props: UnderlineTabsProps): JSX.Element {
  return (
    <RadixTabs.Root
      {...props}
      className={clsx('flex flex-col', props.className)}
    />
  );
}
UnderlineTabs.List = List;
UnderlineTabs.Trigger = Trigger;
UnderlineTabs.Content = Content;

export type UnderlineTabsListProps = RadixTabs.TabsListProps &
  React.RefAttributes<HTMLDivElement>;
function List(props: UnderlineTabsListProps): JSX.Element {
  return (
    <RadixTabs.List
      {...props}
      className={clsx('flex w-fit border-b', props.className)}
    />
  );
}

export type UnderlineTabsTriggerProps = RadixTabs.TabsTriggerProps &
  React.RefAttributes<HTMLButtonElement>;
function Trigger(props: UnderlineTabsTriggerProps): JSX.Element {
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

export type UnderlineTabsContentProps = RadixTabs.TabsContentProps &
  React.RefAttributes<HTMLDivElement>;
function Content(props: UnderlineTabsContentProps): JSX.Element {
  return (
    <RadixTabs.Content
      {...props}
      className={clsx('flex flex-1', props.className)}
    />
  );
}
