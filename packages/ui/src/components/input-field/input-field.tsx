import clsx from 'clsx';
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
  className?: string;
  /**
   * @default 'vertical'
   */
  layout?: 'vertical' | 'horizontal';
};

export function InputField({
  label,
  errorMessage,
  hintText,
  children,
  layout = 'vertical',
  className,
}: InputFieldProps): JSX.Element {
  return layout === 'vertical' ? (
    <label
      className={clsx('flex w-full flex-col items-start gap-1.5', className)}
    >
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
  ) : (
    <label className={clsx('flex w-full flex-row justify-start', className)}>
      <div className="flex w-full flex-col">
        <p className="pr-5 text-sm font-medium text-gray-1200">{label}</p>
        {hintText && (
          <Text variant="secondary" size="sm">
            {hintText}
          </Text>
        )}
      </div>
      <div className="flex w-full flex-col gap-1.5">
        {React.cloneElement(children, { error: !!errorMessage })}
        {errorMessage && (
          <Text role="alert" variant="error" size="xs">
            {errorMessage}
          </Text>
        )}
      </div>
    </label>
  );
}
