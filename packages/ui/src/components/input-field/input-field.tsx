import React from 'react';

import { Text } from '../text';
import { SelectInputProps } from './select-input';
import { TextInputProps } from './text-input';

export type InputFieldProps = {
  children: React.ReactElement<TextInputProps | SelectInputProps>;
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
      {React.cloneElement(children, { error: !!errorMessage })}
      {errorMessage && (
        <Text role="alert" variant="error" size="xs">
          {errorMessage}
        </Text>
      )}
      {!errorMessage && hintText && (
        <Text variant="secondary" size="sm">
          {hintText}
        </Text>
      )}
    </label>
  );
}
