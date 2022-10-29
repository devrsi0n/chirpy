import { noop } from '@chirpy-dev/utils';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';

import { Text, TextProps } from '../text';

export type ToggleProps = {
  label: string;
  labelProps?: TextProps;
  hintText?: string;
  checked: boolean;
  onChange(checked: boolean): void;
  reverse?: boolean;
  className?: string;
  disabled?: boolean;
};

export function Toggle({
  checked,
  label,
  labelProps,
  onChange,
  reverse,
  className,
  disabled,
  hintText,
}: ToggleProps): JSX.Element {
  const handleMoudDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
    [],
  );
  const disabledStyle = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const memoLabel = React.useMemo(
    () => (
      <Switch.Label key="label" className={clsx(disabledStyle)}>
        <Text size="sm" {...labelProps} className="font-semibold">
          {label}
        </Text>
        {hintText && (
          <Text variant="secondary" size="sm">
            {hintText}
          </Text>
        )}
      </Switch.Label>
    ),
    [disabledStyle, hintText, label, labelProps],
  );
  const memoSwitch = React.useMemo(
    () => (
      <Switch
        key="switch"
        checked={checked}
        onChange={disabled ? noop : onChange}
        onMouseDown={handleMoudDown}
        className={clsx(
          !disabled
            ? checked
              ? `bg-primary-900 hover:bg-primary-1000`
              : `bg-gray-400 hover:bg-gray-500`
            : 'bg-gray-400',
          disabledStyle,
          `relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition duration-200 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-primary-500`,
        )}
      >
        {({ checked }) => (
          <span
            className={clsx(
              checked ? `translate-x-4` : `translate-x-0`,
              disabled ? 'bg-gray-100' : 'bg-white ',
              `inline-block h-4 w-4 rounded-full shadow-sm transition duration-200 ease-in-out`,
            )}
          />
        )}
      </Switch>
    ),
    [checked, disabled, onChange, handleMoudDown, disabledStyle],
  );
  const memoElements = React.useMemo(
    () => (reverse ? [memoSwitch, memoLabel] : [memoLabel, memoSwitch]),
    [reverse, memoSwitch, memoLabel],
  );

  return (
    <Switch.Group
      as="div"
      className={clsx('flex w-full flex-row items-start space-x-2', className)}
    >
      {memoElements}
    </Switch.Group>
  );
}
