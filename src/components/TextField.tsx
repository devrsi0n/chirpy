import * as React from 'react';
import clsx from 'clsx';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  containerClassName?: string;
  // type: 'text';
};

export const Textfield = React.forwardRef(function Textfield(
  { label, type = 'text', containerClassName, className, ...inputProps }: TextfieldProps,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  return (
    <label className={`flex flex-col text-text mb-4 ${containerClassName}`}>
      <span className={`font-bold mb-1 leading-6`}>{label}</span>
      <input
        {...inputProps}
        name={label}
        ref={ref}
        type={type}
        className={`text-text leading-8 px-2 border border-gray-500 focus:border-gray-900 rounded-sm ${clsx(
          className,
        )}`}
      />
    </label>
  );
});
