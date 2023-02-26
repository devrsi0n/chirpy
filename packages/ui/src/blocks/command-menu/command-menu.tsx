import { isSSRMode } from '@chirpy-dev/utils';
import clsx from 'clsx';
import { Command } from 'cmdk';
import { useRouter } from 'next/router';
import * as React from 'react';

import { BaseButton, IconSearch } from '../../components';
import { useKeyPressEvent } from '../../hooks';
import { bluredBg } from '../../styles/common';

export type CommandMenuProps = {
  children: React.ReactNode;
};

export function CommandMenu({ children }: CommandMenuProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  useKeyPressEvent(
    {
      targetKey: 'k',
      cmdKey: true,
    },
    () => {
      setOpen(true);
    },
  );
  return (
    <>
      <BaseButton
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg border py-3 px-3.5 text-base text-gray-1100 hover:border-gray-700"
      >
        <IconSearch size={18} />
        <span className="ml-2 leading-none">Search</span>
        <span className="ml-4 flex gap-1.5 text-sm">
          <kbd className="rounded bg-gray-300 p-1 font-sans leading-none">
            {isSSRMode || navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
          </kbd>
          <kbd className="rounded bg-gray-300 py-1 px-1.5 font-sans leading-none">
            K
          </kbd>
        </span>
      </BaseButton>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className={clsx(
          'fixed left-1/2 top-[35vh] w-[640px] -translate-x-1/2 rounded-lg shadow-lg',
          bluredBg,
          'bg-opacity-90',
        )}
      >
        <Input />
        <Command.List className="h-[30vh] overflow-y-auto">
          <Command.Empty className="py-3 px-[18px]">
            No results found.
          </Command.Empty>
          {children}
        </Command.List>
      </Command.Dialog>
    </>
  );
}

CommandMenu.Group = Group;
CommandMenu.Item = Item;
CommandMenu.Separator = Separator;
CommandMenu.Loading = Loading;

function Group(props: React.ComponentProps<typeof Command.Group>): JSX.Element {
  return (
    <Command.Group
      {...props}
      className={clsx(
        'py-4 text-sm font-medium [&_[cmdk-group-heading]]:px-[18px]',
        props.className,
      )}
    />
  );
}

function Item({
  href,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  href: string;
}): JSX.Element {
  const router = useRouter();
  return (
    <Command.Item
      {...props}
      className={clsx(
        'flex items-center gap-2 py-3 px-[18px] hover:cursor-pointer aria-selected:bg-gray-600/40',
        props.className,
      )}
      onSelect={() => {
        router.push(href);
      }}
    />
  );
}

function Separator(
  props: React.ComponentProps<typeof Command.Separator>,
): JSX.Element {
  return (
    <Command.Separator
      {...props}
      className={clsx('border-b', props.className)}
    />
  );
}

function Input(props: React.ComponentProps<typeof Command.Input>): JSX.Element {
  return (
    <div className="flex gap-2 border-b p-4">
      <IconSearch />
      <Command.Input
        placeholder="Search"
        autoFocus
        {...props}
        className={clsx(
          'w-full bg-transparent placeholder:text-gray-1000',
          props.className,
        )}
      />
    </div>
  );
}

function Loading(
  props: React.ComponentProps<typeof Command.Loading>,
): JSX.Element {
  return (
    <Command.Loading
      {...props}
      // @ts-ignore
      className={clsx(`py-3 px-[18px]`)}
    />
  );
}
