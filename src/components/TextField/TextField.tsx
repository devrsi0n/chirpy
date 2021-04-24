import * as React from 'react';
import tw from 'twin.macro';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  errorMessage?: string;
  classes?: {
    root?: string;
    input?: string;
  };
  prefixNode?: React.ReactNode;
};

export const TextField = React.forwardRef(function TextfieldComponent(
  {
    label,
    type = 'text',
    classes = {},
    className,
    errorMessage,
    prefixNode,
    ...inputProps
  }: TextfieldProps,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  return (
    <label className={classes?.root} css={[tw`flex flex-col text-gray-600 mb-4`]}>
      <p tw="mb-1 leading-6 text-lg">{label}</p>
      <div css={[tw`mb-1`, prefixNode && tw`flex flex-row items-stretch`]}>
        {prefixNode && (
          <div tw="bg-gray-50 border-t border-b border-l px-3 rounded-l flex flex-row items-center">
            {prefixNode}
          </div>
        )}
        <input
          {...inputProps}
          name={label}
          ref={ref}
          type={type}
          className={className || classes?.input}
          css={[
            tw`text-gray-600 border border-gray-300 focus:(border-indigo-500 ring-indigo-500)`,
            prefixNode ? tw`flex-1 rounded-r` : tw`rounded`,
            !!errorMessage && tw`border-red-700`,
          ]}
        />
      </div>
      {errorMessage && (
        <p role="alert" tw="text-red-700 text-sm">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
