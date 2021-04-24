import * as React from 'react';
import tw from 'twin.macro';

export type TextfieldProps = React.ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  classes?: {
    root?: string;
    textarea?: string;
  };
  errorMessage?: string;
};

export const TextArea = React.forwardRef(function TextArea(
  { label, className, errorMessage, classes = {}, ...inputProps }: TextfieldProps,
  ref: React.Ref<HTMLTextAreaElement>,
): JSX.Element {
  return (
    <label className={classes.root} css={[tw`flex flex-col text-gray-600 mb-4`]}>
      <p tw="mb-1 leading-6 text-lg">{label}</p>
      <textarea
        {...inputProps}
        name={label}
        ref={ref}
        className={className || classes.textarea}
        css={[
          tw`text-gray-600 leading-8 px-2 border border-gray-300 focus:(border-indigo-500 ring-indigo-500) rounded`,
          !!errorMessage && tw`border-red-700`,
        ]}
        style={{
          minHeight: '4.5em',
        }}
      />
      {errorMessage && (
        <p role="alert" tw="text-red-700 text-xs">
          {errorMessage}
        </p>
      )}
    </label>
  );
});
