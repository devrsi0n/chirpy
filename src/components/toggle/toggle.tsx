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
          `relative inline-flex flex-shrink-0 h-4 w-8 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring`,
        )}
      >
        {({ checked }) => (
          <span
            className={clsx(
              checked ? `translate-x-4` : `translate-x-0`,
              `inline-block w-3 h-3 transition duration-200 ease-in-out bg-white rounded-full`,
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
    <Switch.Group as="div" className="w-full flex items-center space-x-4">
      {memoElements}
    </Switch.Group>
  );
}
