import * as React from 'react';
import { Switch } from '@headlessui/react';

export type ToggleProps = {
  label: string;
  enabled: boolean;
  onChange(checked: boolean): void;
};

export function Toggle({ enabled, label, onChange }: ToggleProps): JSX.Element {
  const handleMoudDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault(),
    [],
  );
  return (
    <Switch.Group as="div" className="w-full flex items-center space-x-4 mb-4">
      <Switch.Label className="text-text font-bold">{label}</Switch.Label>
      <Switch
        as="button"
        checked={enabled}
        onChange={onChange}
        onMouseDown={handleMoudDown}
        className={`${
          enabled ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? 'translate-x-5' : 'translate-x-0'
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
          />
        )}
      </Switch>
    </Switch.Group>
  );
}
