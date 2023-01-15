import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import { m } from 'framer-motion';
import React from 'react';

import { easeInOut } from '../animation';
import { IconChevronDown, IconChevronUp, IconCheck } from '../icons';
import { styles } from './styles';

export type SelectInputProps = RadixSelect.SelectProps &
  Pick<RadixSelect.SelectTriggerProps, 'placeholder'>;

const _SelectInput = React.forwardRef(function SelectInputComponent(
  props: SelectInputProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
): JSX.Element {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger
        asChild
        className="transition duration-150 ease-in-out data-[placeholder]:font-normal data-[placeholder]:text-gray-900"
        ref={forwardedRef}
      >
        <button
          className={clsx(
            props.disabled && styles.disabled,
            'inline-flex w-80 items-center justify-between border py-2.5 px-3.5 font-medium text-gray-1200 shadow-xs',
            styles.borderHover,
            styles.focus,
            'focus-visible:border-primary-800',
            styles.transition,
            'rounded-lg',
          )}
        >
          <RadixSelect.Value placeholder={props.placeholder} />
          <RadixSelect.Icon>
            <IconChevronDown size={20} />
          </RadixSelect.Icon>
        </button>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content asChild>
          <m.div {...easeInOut}>
            <RadixSelect.ScrollUpButton className="flex items-center justify-center text-gray-1200">
              <IconChevronUp />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="rounded-lg bg-white p-2 shadow-lg">
              {props.children}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex items-center justify-center text-gray-1200">
              <IconChevronDown />
            </RadixSelect.ScrollDownButton>
          </m.div>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: React.ComponentProps<typeof RadixSelect.Item>,
    forwardedRef: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <RadixSelect.Item
        ref={forwardedRef}
        className={clsx(
          'relative flex items-center justify-start rounded-md px-3.5 py-2.5 font-medium text-gray-1200 focus:bg-gray-300',
          'data-[disabled]:opacity-50',
          'select-none focus:outline-none',
          className,
        )}
        {...props}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute right-2 inline-flex items-center text-primary-900">
          <IconCheck size={20} />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  },
);

SelectItem.displayName = 'SelectInput.Item';
export const SelectInput = Object.assign(_SelectInput, {
  Item: SelectItem,
});
