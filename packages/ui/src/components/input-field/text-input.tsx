import clsx from 'clsx';
import React from 'react';

import { Text } from '../text';
import { styles } from './styles';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
  error?: boolean;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
};

export const TextInput = React.forwardRef(function TextInputComponent(
  { error, prefixNode, suffixNode, className, ...inputProps }: TextInputProps,
  forwardedRef: React.Ref<HTMLInputElement>,
): JSX.Element {
  return (
    <div
      className={clsx(
        'w-full',
        (prefixNode || suffixNode) && 'flex flex-row items-stretch',
      )}
    >
      {prefixNode && (
        <div className="flex items-center rounded-tl-lg rounded-bl-lg border-t border-b border-l py-2.5 pl-3.5 pr-3">
          {typeof prefixNode === 'string' ? (
            <Text variant="secondary">{prefixNode}</Text>
          ) : (
            prefixNode
          )}
        </div>
      )}
      <input
        type="text"
        ref={forwardedRef}
        className={clsx(
          'w-full',
          error
            ? 'focus-visible:border-red-800'
            : 'focus-visible:border-primary-800',
          error &&
            'border-red-700 hover:border-red-800 focus-visible:ring-red-700',
          inputProps.disabled && styles.disabled,
          'flex-row items-center gap-2 border py-2.5 px-3.5 text-gray-1200 placeholder-gray-900 shadow-xs',
          !inputProps.disabled && styles.borderHover,
          styles.transition,
          styles.focus,
          'rounded-lg',
          prefixNode && 'rounded-tl-none rounded-bl-none',
          suffixNode && 'rounded-tr-none rounded-br-none',
          className,
        )}
        {...inputProps}
      />
      {suffixNode && (
        <div className="flex items-center rounded-tr-lg rounded-br-lg border-t border-b border-r py-2.5 pl-3.5 pr-3">
          {typeof suffixNode === 'string' ? (
            <Text variant="secondary">{suffixNode}</Text>
          ) : (
            suffixNode
          )}
        </div>
      )}
    </div>
  );
});
