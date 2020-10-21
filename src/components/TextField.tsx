import * as React from 'react';
import clsx from 'clsx';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  containerClassName?: string;
  errorMessage?: string;
};

export const Textfield = React.forwardRef(function Textfield(
  {
    label,
    type = 'text',
    containerClassName,
    className,
    errorMessage,
    ...inputProps
  }: TextfieldProps,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  return (
    <label className={clsx(`flex flex-col text-text mb-4`, containerClassName)}>
      <p className={`font-bold mb-1 leading-6`}>{label}</p>
      <input
        {...inputProps}
        name={label}
        ref={ref}
        type={type}
        className={clsx(
          `text-text leading-8 px-2 border border-gray-500 focus:border-gray-900 rounded-sm`,
          className,
          {
            'border-red-700': !!errorMessage,
          },
        )}
      />
      {errorMessage && (
        <p role="alert" className="text-red-700 text-xs">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
