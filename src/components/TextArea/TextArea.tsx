import * as React from 'react';

import tw from 'twin.macro';

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
    <label className={containerClassName} css={[tw`flex flex-col text-gray-500 mb-4`]}>
      <p tw="font-bold mb-1 leading-6">{label}</p>
      <textarea
        {...inputProps}
        name={label}
        ref={ref}
        className={className}
        css={[
          tw`text-gray-500 leading-8 px-2 border border-gray-500 focus:border-gray-900 rounded-sm`,
          !!errorMessage && tw`border-red-700`,
        ]}
        style={{
          minHeight: '4.5em',
        }}
      />
      {errorMessage && (
        <p role="alert" tw="text-red-700 text-xs">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
