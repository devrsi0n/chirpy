import clsx from 'clsx';
import * as React from 'react';

import { border, textInput, textInputError } from '@chirpy/styles/common';

export type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  styles?: {
    root?: string;
    textarea?: string;
  };
  errorMessage?: string;
};

export const TextArea = React.forwardRef(function TextArea(
  { label, className, errorMessage, styles = {}, ...inputProps }: TextAreaProps,
  ref: React.Ref<HTMLTextAreaElement>,
): JSX.Element {
  return (
    <label className={clsx('flex flex-col text-gray-1200 mb-4', styles.root)}>
      <p className="mb-1 leading-6 text-lg">{label}</p>
      <textarea
        {...inputProps}
        name={label}
        ref={ref}
        className={clsx(
          `leading-8 px-2 border rounded`,
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
        <p role="alert" className="text-red-700 text-xs">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
