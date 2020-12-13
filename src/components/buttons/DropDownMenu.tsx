import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import clsx from 'clsx';

export type DropDownMenuProps = React.PropsWithChildren<{
  content: React.ReactNode;
  classes?: {
    items?: string;
  };
}>;

export function DropDownMenu(props: DropDownMenuProps): JSX.Element {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                <span>{props.content}</span>
                <ChevronDown
                  className={clsx('w-5 h-5 ml-2 -mr-1 transform', open && 'rotate-180')}
                />
              </Menu.Button>
            </span>

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
                  'absolute right-0 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none space-y-1 py-1 z-30',
                  props.classes?.items,
                )}
              >
                {props.children}
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
            'flex flex-row items-center border-none',
            active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
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
