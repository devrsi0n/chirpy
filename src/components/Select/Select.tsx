import Check from '@geist-ui/react-icons/check';
import ChevronUpDown from '@geist-ui/react-icons/chevronUpDown';
import { Listbox, Transition } from '@headlessui/react';
import * as React from 'react';
import tw from 'twin.macro';

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
            <Listbox.Label css={tw`block text-sm font-bold text-gray-500 mb-1`}>
              {label}
            </Listbox.Label>
          )}

          <div css={tw`relative`} className={className}>
            <span css={tw`inline-block w-full rounded-md shadow-sm`}>
              <Listbox.Button
                css={tw`cursor-default relative w-full rounded-sm border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:(outline-none ring-blue-500 border-primary-300) transition ease-in-out duration-150 sm:text-sm`}
              >
                <span css={tw`block truncate`}>{name || value}</span>
                <span
                  css={tw`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none`}
                >
                  <ChevronUpDown />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave={`transition ease-in duration-100`}
              leaveFrom={`opacity-100`}
              leaveTo={`opacity-0`}
              tw="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20"
            >
              <Listbox.Options
                static
                tw="max-h-60 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
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
          css={[
            active ? tw`text-white bg-primary-300` : tw`text-gray-900`,
            tw`cursor-pointer select-none relative py-2 pl-8 pr-4`,
          ]}
        >
          <span css={[selected ? tw`font-semibold` : tw`font-normal`, tw`block truncate`]}>
            {children}
          </span>
          {selected && (
            <span
              css={[
                active ? tw`text-white` : tw`text-gray-400`,
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
