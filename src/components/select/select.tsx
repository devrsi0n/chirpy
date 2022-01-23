import Check from '@geist-ui/react-icons/check';
import ChevronDownCircleFill from '@geist-ui/react-icons/chevronDownCircleFill';
import { Listbox } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { css, theme } from 'twin.macro';

import { listHoverable, cardBg } from '$/styles/common';

import { easeInOut } from '../animation';

export type SelectProps<T> = React.PropsWithChildren<{
  name?: string;
  value: T;
  onChange(value: T): void;
  label?: string;
  className?: string;
}>;

export function Select<T>({
  name,
  value,
  children,
  onChange,
  label,
  className,
}: SelectProps<T>): JSX.Element {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div tw="text-gray-1100">
          {label && <Listbox.Label css={tw`block text-sm font-bold mb-1`}>{label}</Listbox.Label>}
          <div css={tw`relative`} className={className}>
            <span css={tw`inline-block w-full`}>
              <Listbox.Button
                css={tw`cursor-default relative w-full pl-3 pr-8 py-2 text-left focus-visible:(outline-none ring-primary-700) transition ease-in-out duration-150 border border-transparent rounded hover:(border-primary-700)`}
              >
                <span>{name || value}</span>
                <span
                  css={[
                    css`
                      --geist-icons-background: ${theme('colors.gray.1100')};
                    `,
                    tw`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-300`,
                  ]}
                >
                  <ChevronDownCircleFill size={18} />
                </span>
              </Listbox.Button>
            </span>
            <AnimatePresence>
              {open && (
                <m.div
                  {...easeInOut}
                  tw="absolute mt-1 w-full rounded-md shadow-lg z-20"
                  css={cardBg}
                >
                  <Listbox.Options
                    static
                    tw="max-h-60 rounded-sm py-1 px-0.5 text-base border border-gray-400 overscroll-contain overflow-auto focus-visible:outline-none sm:text-sm"
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
};

function SelectOption<T>({ value, children }: SelectOptionProps<T>): JSX.Element {
  return (
    <Listbox.Option key={String(value)} value={value as $TsFixMe}>
      {/* active includes hover event */}
      {({ selected, active }) => (
        <div
          css={[
            active && listHoverable,
            tw`text-gray-1100 cursor-pointer select-none relative py-2 pl-7 pr-4`,
          ]}
        >
          <span tw="block">{children}</span>
          {selected && (
            <span
              css={[
                active && listHoverable,
                tw`absolute inset-y-0 left-0 flex items-center pl-1.5`,
              ]}
            >
              <Check size={16} />
            </span>
          )}
        </div>
      )}
    </Listbox.Option>
  );
}
