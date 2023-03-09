import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import React from 'react';

import { easeInOutOpacity } from '../animation';
import type { InputProps } from '../input';
import type { SelectProps } from '../select';
import { Text } from '../text';
import type { TextAreaProps } from '../text-area';

export type FormFieldProps = {
  label?: string;
  errorMessage?: string;
  children: React.ReactElement<InputProps | SelectProps | TextAreaProps>;
  /**
   * @default 'vertical'
   * Prefer layout, only render horizontal on sm or bigger screens even if layout is horizontal
   */
  layout?: 'vertical' | 'horizontal';
  className?: string;
  hint?: React.ReactNode;
  disabled?: boolean;
};

export function FormField({
  label,
  errorMessage,
  hint,
  children,
  layout = 'vertical',
  className,
  ...childrenProps
}: FormFieldProps): JSX.Element {
  return (
    <div data-selected-layout={layout}>
      <label
        data-layout="vertical"
        className={clsx(
          'h-full w-full ',
          label && `gap-1.5`,
          layout === 'vertical'
            ? 'flex flex-col items-start'
            : 'flex flex-col items-start sm:hidden',
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
            hint && (
              <m.div
                className="mt-1.5"
                key={`${label}-hint`}
                {...easeInOutOpacity}
              >
                <Text variant="secondary" size="sm">
                  {hint}
                </Text>
              </m.div>
            )
          )}
        </AnimatePresence>
      </label>
      <label
        data-layout="horizontal"
        className={clsx(
          'w-full',
          layout === 'horizontal'
            ? 'hidden flex-row justify-start sm:flex'
            : 'hidden',
          className,
        )}
      >
        <div className="flex w-full flex-col">
          <p className="pr-5 text-sm font-medium text-gray-1200">{label}</p>
          {hint && (
            <Text className="mt-1.5" variant="secondary" size="sm">
              {hint}
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
    </div>
  );
}
