import * as React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { CheckMarkIcon } from '../Icons/CheckMarkIcon';
import { ChevronUpDownIcon } from '../Icons/ChevronUpDownIcon';

export type SelectProps<T> = React.PropsWithChildren<{
  value: T;
  onChange(value: T): void;
  /**
   * Use alternate name for `value`
   */
  name?: string;
  label?: string;
  className?: string;
}>;

export function Select<T>({
  value,
  name,
  children,
  onChange,
  label,
  className,
}: SelectProps<T>): JSX.Element {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm leading-5 font-bold text-text mb-1">
              {label}
            </Listbox.Label>
          )}

          <div className={clsx('relative', className)}>
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button className="cursor-default relative w-full rounded-sm border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-purple-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                <span className="block truncate">{name || value}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20"
            >
              <Listbox.Options
                static
                className="max-h-60 rounded-sm py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

Select.Option = SelectOption;

type SelectOptionProps<T> = {
  children: React.ReactNode;
  value: T;
};

function SelectOption<T>({ value, children }: SelectOptionProps<T>): JSX.Element {
  return (
    <Listbox.Option key={String(value)} value={value as $TsFixMe}>
      {/* active includes hover event */}
      {({ selected, active }) => (
        <div
          className={clsx(
            active ? 'text-white bg-purple-300' : 'text-gray-900',
            `cursor-pointer select-none relative py-2 pl-8 pr-4`,
          )}
        >
          <span className={clsx(selected ? 'font-semibold' : 'font-normal', `block truncate`)}>
            {children}
          </span>
          {selected && (
            <span
              className={clsx(
                active ? 'text-white' : 'text-gray-400',
                `absolute inset-y-0 left-0 flex items-center pl-1.5`,
              )}
            >
              <CheckMarkIcon />
            </span>
          )}
        </div>
      )}
    </Listbox.Option>
  );
}
