import * as React from 'react';

import tw from 'twin.macro';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  containerClassName?: string;
  errorMessage?: string;
};

export const TextField = React.forwardRef(function Textfield(
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
    <label className={containerClassName} css={[tw`flex flex-col text-gray-500 mb-4`]}>
      <p tw="font-bold mb-1 leading-6">{label}</p>
      <input
        {...inputProps}
        name={label}
        ref={ref}
        type={type}
        className={className}
        css={[
          tw`text-gray-500 leading-8 px-2 border border-gray-500 focus:border-gray-900 rounded-sm`,
          !!errorMessage && tw`border-red-700`,
        ]}
      />
      {errorMessage && (
        <p role="alert" tw="text-red-700 text-xs">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
