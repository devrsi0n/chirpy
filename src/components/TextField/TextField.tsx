import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { border, textInput, textInputError } from '$/styles/common';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: React.ReactNode;
  errorMessage?: string;
  styles?: {
    root?: TwStyle;
    input?: TwStyle;
  };
  prefixNode?: React.ReactNode;
};

export const TextField = React.forwardRef(function TextfieldComponent(
  {
    label,
    type = 'text',
    styles = {},
    className,
    errorMessage,
    prefixNode,
    ...inputProps
  }: TextfieldProps,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  const LabelWrapper = typeof label === 'string' ? 'p' : 'div';
  return (
    <label css={[tw`flex flex-col text-gray-1200 mb-3 px-0.5`, styles?.root]}>
      <LabelWrapper tw="mb-1 leading-6 text-lg">{label}</LabelWrapper>
      <div css={[tw`mb-1`, prefixNode && tw`flex flex-row items-stretch`]}>
        {prefixNode && (
          <div tw="border-t border-b border-l px-3 rounded-l flex flex-row items-center">
            {prefixNode}
          </div>
        )}
        <input
          autoComplete="off"
          {...inputProps}
          ref={ref}
          type={type}
          className={className}
          tw="px-3 py-2"
          css={[
            textInput,
            border,
            prefixNode ? tw`flex-1 rounded-r` : tw`rounded`,
            !!errorMessage && textInputError,
            styles?.input,
          ]}
        />
      </div>
      <p role="alert" tw="text-red-900 text-sm leading-none h-4">
        {errorMessage}
      </p>
    </label>
  );
});
