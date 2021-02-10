import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import clsx from 'clsx';

export type Shape = 'circle' | 'square';

export type DropDownMenuProps = React.PropsWithChildren<{
  content: React.ReactNode;
  shape?: Shape;
  classes?: {
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
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }: { open: boolean }) => (
          <>
            <Menu.Button
              className={clsx(
                'inline-flex items-center justify-center w-full text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 active:bg-gray-50 active:text-gray-800',
                shape === 'circle' && 'rounded-full p-1',
                shape === 'square' && 'rounded-md border border-gray-300 py-3 px-2',
              )}
            >
              <span>{content}</span>
              {shape === 'square' && (
                <ChevronDown
                  className={clsx('w-5 h-5 ml-2 -mr-1 transform', open && 'rotate-180')}
                />
              )}
            </Menu.Button>

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
                  'absolute right-0 mt-1 bg-white origin-top-right border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none space-y-1 py-1 z-30',
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
            'flex flex-row items-center border-none text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer',
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
