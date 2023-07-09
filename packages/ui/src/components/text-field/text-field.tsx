import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
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
  prefixNode?: React.ReactNode;
  hintText?: string;
};

export const TextField = React.forwardRef(function TextfieldComponent(
  {
    label,
    type = 'text',
    styles = {},
    className,
    errorMessage,
    prefixNode,
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
      <div className={clsx(prefixNode && `flex flex-row items-stretch`)}>
        {prefixNode && (
          <div className="flex flex-row items-center rounded-l border-b border-l border-t px-3">
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
            disabled && `cursor-not-allowed bg-gray-300 text-gray-1100`,
            textInput,
            border,
            prefixNode ? `flex-1 rounded-r` : `rounded`,
            !!errorMessage && textInputError,
            styles?.input,
            className,
          )}
        />
      </div>
      {hintText && (
        <Text variant="secondary" size="sm" className="mt-1.5">
          {hintText}
        </Text>
      )}
      <AnimatePresence>
        {errorMessage && (
          <motion.p
            {...easeInOutOpacity}
            role="alert"
            className="mt-1.5 text-sm leading-none text-red-900"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </label>
  );
});
