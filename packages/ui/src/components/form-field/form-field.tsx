import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import React from 'react';

import { easeInOutOpacity } from '../animation';
import type { InputProps } from '../input';
import type { SelectProps } from '../select';
import { Text } from '../text';
import type { TextAreaProps } from '../text-area';

export type FormFieldProps = {
  children: React.ReactElement<InputProps | SelectProps | TextAreaProps>;
  label?: string;
  errorMessage?: string;
  hintText?: string;
  disabled?: boolean;
  className?: string;
  /**
   * @default 'vertical'
   */
  layout?: 'vertical' | 'horizontal';
};

export function FormField({
  label,
  errorMessage,
  hintText,
  children,
  layout = 'vertical',
  className,
  ...childrenProps
}: FormFieldProps): JSX.Element {
  return layout === 'vertical' ? (
    <label
      className={clsx(
        'flex h-full w-full flex-col items-start gap-1.5',
        className,
      )}
    >
      <p className="text-sm font-medium">{label}</p>
      {React.cloneElement(children, {
        error: !!errorMessage,
        ...childrenProps,
      })}
      <AnimatePresence>
        {errorMessage ? (
          <m.div key={`${label}-error`} {...easeInOutOpacity}>
            <Text role="alert" variant="error" size="sm">
              {errorMessage}
            </Text>
          </m.div>
        ) : (
          hintText && (
            <m.div key={`${label}-hint`} {...easeInOutOpacity}>
              <Text variant="secondary" size="sm">
                {hintText}
              </Text>
            </m.div>
          )
        )}
      </AnimatePresence>
    </label>
  ) : (
    <label className={clsx('flex w-full flex-row justify-start', className)}>
      <div className="flex w-full flex-col">
        <p className="pr-5 text-sm font-medium text-gray-1200">{label}</p>
        {hintText && (
          <Text variant="secondary" size="sm">
            {hintText}
          </Text>
        )}
      </div>
      <div className="flex w-full flex-col gap-1.5">
        {React.cloneElement(children, {
          error: !!errorMessage,
          ...childrenProps,
        })}
        <AnimatePresence>
          {errorMessage && (
            <m.div {...easeInOutOpacity}>
              <Text role="alert" variant="error" size="sm">
                {errorMessage}
              </Text>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </label>
  );
}
