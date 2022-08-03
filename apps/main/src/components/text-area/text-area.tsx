import clsx from 'clsx';
import * as React from 'react';

import { border, textInput, textInputError } from '$/styles/common';

export type TextfieldProps = React.ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  styles?: {
    root?: string;
    textarea?: string;
  };
  errorMessage?: string;
};

export const TextArea = React.forwardRef(function TextArea(
  {
    label,
    className,
    errorMessage,
    styles = {},
    ...inputProps
  }: TextfieldProps,
  ref: React.Ref<HTMLTextAreaElement>,
): JSX.Element {
  return (
    <label className={clsx('mb-4 flex flex-col text-gray-1200', styles.root)}>
      <p className="mb-1 text-lg font-semibold leading-6">{label}</p>
      <textarea
        {...inputProps}
        name={label}
        ref={ref}
        className={clsx(
          `rounded border px-2 leading-8`,
          textInput,
          border,
          !!errorMessage && textInputError,
          className || styles.textarea,
        )}
        style={{
          minHeight: '4.5em',
        }}
      />
      {errorMessage && (
        <p role="alert" className="text-xs text-red-700">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
