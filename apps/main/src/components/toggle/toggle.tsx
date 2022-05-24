import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';

import { Text, TextProps } from '../text';

export type ToggleProps = {
  label: string;
  labelProps?: TextProps;
  enabled: boolean;
  onChange(checked: boolean): void;
  reverse?: boolean;
};

export function Toggle({
  enabled,
  label,
  labelProps,
  onChange,
  reverse,
}: ToggleProps): JSX.Element {
  const handleMoudDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
    [],
  );
  const memoLabel = React.useMemo(
    () => (
      <Switch.Label key="label" className="overflow-hidden whitespace-nowrap">
        <Text
          as="span"
          style={{
            cursor: 'pointer',
          }}
          size="sm"
          {...labelProps}
        >
          {label}
        </Text>
      </Switch.Label>
    ),
    [label, labelProps],
  );
  const memoSwitch = React.useMemo(
    () => (
      <Switch
        key="switch"
        checked={enabled}
        onChange={onChange}
        onMouseDown={handleMoudDown}
        className={clsx(
          enabled ? `bg-primary-500` : `bg-gray-300 dark:bg-gray-600`,
          `relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring`,
        )}
      >
        {({ checked }) => (
          <span
            className={clsx(
              checked ? `translate-x-4` : `translate-x-0`,
              `inline-block h-3 w-3 rounded-full bg-white transition duration-200 ease-in-out`,
            )}
          />
        )}
      </Switch>
    ),
    [enabled, onChange, handleMoudDown],
  );
  const memoElements = React.useMemo(
    () => (reverse ? [memoSwitch, memoLabel] : [memoLabel, memoSwitch]),
    [reverse, memoSwitch, memoLabel],
  );

  return (
    <Switch.Group as="div" className="flex w-full items-center space-x-4">
      {memoElements}
    </Switch.Group>
  );
}
