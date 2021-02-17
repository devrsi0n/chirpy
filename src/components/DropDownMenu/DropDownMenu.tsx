import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import clsx from 'clsx';
import { Button, IconButton } from '../Button';

export type Shape = 'circle' | 'square';

export type DropDownMenuProps = React.PropsWithChildren<{
  content: React.ReactNode;
  shape?: Shape;
  classes?: {
    root?: string;
    button?: string;
    items?: string;
  };
}>;

export function DropDownMenu({
  content,
  shape = 'circle',
  classes,
  children,
}: DropDownMenuProps): JSX.Element {
  return (
    <div className={clsx('relative inline-block text-left', classes?.root)}>
      <Menu>
        {({ open }: { open: boolean }) => (
          <>
            <div className={classes?.button}>
              <Menu.Button as={shape === 'circle' ? IconButton : Button}>
                <span>{content}</span>
                {shape === 'square' && (
                  <ChevronDown
                    className={clsx('w-5 h-5 ml-2 -mr-1 transform', open && 'rotate-180')}
                  />
                )}
              </Menu.Button>
            </div>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={clsx(
                  'absolute right-0 mt-1 bg-white dark:bg-black origin-top-right border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 rounded-md shadow-lg outline-none space-y-1 py-1 z-30',
                  classes?.items,
                )}
              >
                {children}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

DropDownMenu.Item = DropDownMenuItem;

export type DropDownMenuItemProps = React.PropsWithChildren<{
  className?: string;
  onClick?(): void;
}>;

export function DropDownMenuItem(props: DropDownMenuItemProps): JSX.Element {
  return (
    <Menu.Item onClick={props.onClick}>
      {({ active }) => (
        <div
          className={clsx(
            'flex flex-row items-center border-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer',
            `w-full px-6 py-2 text-sm leading-5 text-right`,
            props.className,
          )}
        >
          {props.children}
        </div>
      )}
    </Menu.Item>
  );
}
