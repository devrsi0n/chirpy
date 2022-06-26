import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { listHoverable, cardBg } from '$/styles/common';

import { easeInOut } from '../animation';
import { IconCheck, IconChevronDownCircleFill } from '../icons';
import styles from './select.module.scss';

export type SelectVariant = 'borderless' | 'default';
export type SelectPlacement = 'top' | 'bottom';
export type SelectProps<T> = React.PropsWithChildren<{
  name?: string;
  value: T;
  onChange(value: T): void;
  label?: string;
  className?: string;
  variant?: SelectVariant;
  placement?: SelectPlacement;
}>;

const VARIANT_CLASSES: Record<SelectVariant, string> = {
  borderless: 'border border-transparent',
  default: 'border',
};

const PLACEMENT_CLASSES: Record<SelectPlacement, string> = {
  top: 'bottom-0',
  bottom: '',
};

export function Select<T extends string | number = string>({
  name,
  value,
  children,
  onChange,
  label,
  className,
  variant = 'default',
  placement = 'bottom',
}: SelectProps<T>): JSX.Element {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement[];
  // Find the selected option's children element
  const selectedOption = childrenArray.find((elm) => elm.props.value === value)
    ?.props.children;
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="text-gray-1100">
          {label && (
            <Listbox.Label className={`mb-1 block text-sm font-bold`}>
              {label}
            </Listbox.Label>
          )}
          <div className={clsx(`relative`, className)}>
            <span className={`inline-block w-full`}>
              <Listbox.Button
                className={clsx(
                  `focus-visible:outline-none relative w-full cursor-default rounded py-2 pl-3 pr-8 text-left transition duration-150 ease-in-out hover:border-primary-700 focus-visible:ring-primary-700`,
                  VARIANT_CLASSES[variant],
                )}
              >
                <span className={childrenWrapper}>
                  {selectedOption || name || value}
                </span>
                <span
                  className={clsx(
                    'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-300',
                    styles.icon,
                  )}
                >
                  <IconChevronDownCircleFill size={18} />
                </span>
              </Listbox.Button>
            </span>
            <AnimatePresence>
              {open && (
                <m.div
                  {...easeInOut}
                  className={clsx(
                    'absolute z-20 mt-1 w-full rounded-md shadow-lg',
                    cardBg,
                    PLACEMENT_CLASSES[placement],
                  )}
                >
                  <Listbox.Options
                    static
                    className="focus-visible:outline-none max-h-60 overflow-auto overscroll-contain rounded-sm border border-gray-400 py-1 px-0.5 text-base sm:text-sm"
                  >
                    {children}
                  </Listbox.Options>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Listbox>
  );
}

Select.Option = SelectOption;

type SelectOptionProps<T> = {
  children: React.ReactNode;
  value: T;
  className?: string;
};

function SelectOption<T>({
  value,
  children,
  className,
}: SelectOptionProps<T>): JSX.Element {
  return (
    <Listbox.Option key={String(value)} value={value as $TsFixMe}>
      {/* active includes hover event */}
      {({ selected, active }) => (
        <div
          className={clsx(
            active && listHoverable,
            `relative cursor-pointer select-none py-2 pl-7 pr-4 text-gray-1100`,
          )}
        >
          <span className={clsx(childrenWrapper, className)}>{children}</span>
          {selected && (
            <span
              className={clsx(
                active && listHoverable,
                `absolute inset-y-0 left-0 flex items-center pl-1.5`,
              )}
            >
              <IconCheck size={16} />
            </span>
          )}
        </div>
      )}
    </Listbox.Option>
  );
}

const childrenWrapper = 'flex flex-row items-center space-x-1';
