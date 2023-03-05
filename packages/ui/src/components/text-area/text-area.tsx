import clsx from 'clsx';
import React from 'react';

import { getInputStyles } from '../input';

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
        getInputStyles(error),
        className,
      )}
      {...textAreaProps}
    />
  );
});
