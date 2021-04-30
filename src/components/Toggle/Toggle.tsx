import { Switch } from '@headlessui/react';
import * as React from 'react';
import tw from 'twin.macro';

import { Text, TextProps } from '../Text/Text';

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
      <Switch.Label key="label" tw="overflow-hidden whitespace-nowrap">
        <Text
          as="span"
          style={{
            cursor: 'pointer',
          }}
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
        as="button"
        type="button"
        checked={enabled}
        onChange={onChange}
        onMouseDown={handleMoudDown}
        css={[
          enabled ? tw`bg-primary-500` : tw`bg-gray-300 dark:bg-gray-600`,
          tw`relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:(outline-none ring)`,
        ]}
      >
        {({ checked }) => (
          <span
            css={[
              checked ? tw`translate-x-5` : tw`translate-x-0`,
              tw`inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`,
            ]}
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
    <Switch.Group as="div" tw="w-full flex items-center space-x-4">
      {memoElements}
    </Switch.Group>
  );
}
