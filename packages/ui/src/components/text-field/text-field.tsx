import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { border, textInput, textInputError } from '../../styles/common';
import { easeInOutOpacity } from '../animation';
import { Text } from '../text/text';

export type TextfieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: React.ReactNode;
  errorMessage?: string;
  styles?: {
    root?: string;
    input?: string;
  };
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hintText?: string;
};

export const TextField = React.forwardRef(function TextfieldComponent(
  {
    label,
    type = 'text',
    styles = {},
    className,
    errorMessage,
    prefix,
    suffix,
    hintText,
    ...inputProps
  }: TextfieldProps,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  const LabelWrapper = typeof label === 'string' ? 'p' : 'div';
  const { disabled } = inputProps;
  return (
    <label
      className={clsx(`flex flex-col px-0.5 text-gray-1200`, styles?.root)}
    >
      <LabelWrapper className="mb-1.5 text-lg font-semibold leading-6">
        {label}
      </LabelWrapper>
      <div
        className={clsx((prefix || suffix) && `flex flex-row items-stretch`)}
      >
        {prefix && (
          <div className="flex flex-row items-center rounded-l border-t border-b border-l px-3">
            {prefix}
          </div>
        )}
        <input
          autoComplete="off"
          {...inputProps}
          ref={ref}
          type={type}
          className={clsx(
            'px-3 py-2',
            disabled && `bg-gray-300 text-gray-1100`,
            textInput,
            border,
            !prefix && !suffix && `rounded`,
            prefix && `flex-1 rounded-r`,
            suffix && `flex-1 rounded-l`,
            !!errorMessage && textInputError,
            styles?.input,
            className,
          )}
        />
        {suffix && (
          <div className="flex flex-row items-center rounded-r border-t border-b border-r px-3">
            {suffix}
          </div>
        )}
      </div>
      {hintText && (
        <Text variant="secondary" size="sm" className="mt-1.5">
          {hintText}
        </Text>
      )}
      <AnimatePresence>
        {errorMessage && (
          <m.p
            {...easeInOutOpacity}
            role="alert"
            className="mt-1.5 text-sm leading-none text-red-900"
          >
            {errorMessage}
          </m.p>
        )}
      </AnimatePresence>
    </label>
  );
});
