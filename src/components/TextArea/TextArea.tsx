import * as React from 'react';
import clsx from 'clsx';

export type TextfieldProps = React.ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  containerClassName?: string;
  errorMessage?: string;
};

export const TextArea = React.forwardRef(function TextArea(
  { label, containerClassName, className, errorMessage, ...inputProps }: TextfieldProps,
  ref: React.Ref<HTMLTextAreaElement>,
): JSX.Element {
  return (
    <label className={clsx(`flex flex-col text-text mb-4`, containerClassName)}>
      <p className={`font-bold mb-1 leading-6`}>{label}</p>
      <textarea
        {...inputProps}
        name={label}
        ref={ref}
        className={clsx(
          `text-text leading-8 px-2 border border-gray-500 focus:border-gray-900 rounded-sm`,
          className,
          {
            'border-red-700': !!errorMessage,
          },
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
