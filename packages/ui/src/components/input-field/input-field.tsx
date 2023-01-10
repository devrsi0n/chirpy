import clsx from 'clsx';
import React from 'react';

import { Text } from '../text';

export type InputFieldProps = {
  children: React.ReactElement<TextInputProps>;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  hintText?: string;
  disabled?: boolean;
};

export function InputField({
  label = 'Label',
  errorMessage,
  hintText,
  children,
}: InputFieldProps): JSX.Element {
  return (
    <label className="flex flex-col items-start gap-2">
      <p className="text-sm font-medium">{label}</p>
      {!errorMessage && hintText && (
        <Text variant="secondary" size="sm">
          {hintText}
        </Text>
      )}
      {React.cloneElement(children, { error: !!errorMessage })}
      {errorMessage && (
        <Text role="alert" variant="error" size="xs">
          {errorMessage}
        </Text>
      )}
    </label>
  );
}

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
  error?: boolean;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
};

export const TextInput = React.forwardRef(function TextInputComponent({
  error,
  prefixNode,
  suffixNode,
  ...inputProps
}: TextInputProps): JSX.Element {
  return (
    <input
      className={clsx(
        error
          ? 'focus-visible:border-red-800'
          : 'focus-visible:border-primary-800',
        error &&
          'border-red-700 hover:border-red-800 focus-visible:ring-red-700',
        inputProps?.disabled &&
          'cursor-not-allowed bg-gray-300 text-gray-1100 shadow-none hover:border-gray-700',
        'w-80 flex-row items-center gap-2 rounded-lg border py-2.5 px-3.5 text-gray-1200 placeholder-gray-900 shadow-xs',
        'hover:border-gray-800',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-700 focus-visible:ring-opacity-25',
      )}
      type="text"
      {...inputProps}
    />
  );
});
