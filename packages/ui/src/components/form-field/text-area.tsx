import clsx from 'clsx';
import React from 'react';

import { styles } from './styles';

export type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  error?: boolean;
};

export const TextArea = React.forwardRef(function TextArea(
  { error, className, ...textAreaProps }: TextAreaProps,
  forwardedRef: React.Ref<HTMLTextAreaElement>,
): JSX.Element {
  return (
    <textarea
      ref={forwardedRef}
      className={clsx(
        'min-h-[128px] w-full bg-gray-0',
        error
          ? 'focus-visible:border-red-800'
          : 'focus-visible:border-primary-800',
        error &&
          'border-red-700 hover:border-red-800 focus-visible:ring-red-700',
        textAreaProps.disabled && styles.disabled,
        'flex-row items-center gap-2 border py-2.5 px-3.5 text-gray-1200 placeholder-gray-900 shadow-xs',
        !textAreaProps.disabled && !error && styles.borderHover,
        styles.transition,
        styles.focus,
        'rounded-lg',
        className,
      )}
      {...textAreaProps}
    />
  );
});
