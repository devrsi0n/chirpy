import clsx from 'clsx';
import * as React from 'react';

import { border, textInput, textInputError } from '../../styles/common';
import { TextFieldError, TextFieldHint } from '../text-field';

export type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  styles?: {
    root?: string;
    textarea?: string;
  };
  errorMessage?: string;
  hintText?: string;
};

export const TextArea = React.forwardRef(function TextArea(
  {
    label,
    className,
    errorMessage,
    styles = {},
    hintText,
    ...inputProps
  }: TextAreaProps,
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
          `min-h-[4.5em] rounded border px-2 leading-8`,
          textInput,
          border,
          !!errorMessage && textInputError,
          className || styles.textarea,
        )}
      />
      <TextFieldHint>{hintText}</TextFieldHint>
      <TextFieldError message={errorMessage} />
    </label>
  );
});
