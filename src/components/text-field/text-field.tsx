import clsx from 'clsx';
import * as React from 'react';

import { border, textInput, textInputError } from '$/styles/common';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: React.ReactNode;
  errorMessage?: string;
  styles?: {
    root?: string;
    input?: string;
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
    <label className={clsx(`flex flex-col text-gray-1200 mb-3 px-0.5`, styles?.root)}>
      <LabelWrapper className="mb-1 leading-6 text-lg">{label}</LabelWrapper>
      <div className={clsx(`mb-1`, prefixNode && `flex flex-row items-stretch`)}>
        {prefixNode && (
          <div className="border-t border-b border-l px-3 rounded-l flex flex-row items-center">
            {prefixNode}
          </div>
        )}
        <input
          autoComplete="off"
          {...inputProps}
          ref={ref}
          type={type}
          className={clsx(
            'px-3 py-2',
            textInput,
            border,
            prefixNode ? `flex-1 rounded-r` : `rounded`,
            !!errorMessage && textInputError,
            styles?.input,
            className,
          )}
        />
      </div>
      <p role="alert" className="text-red-900 text-sm leading-none h-4">
        {errorMessage}
      </p>
    </label>
  );
});
