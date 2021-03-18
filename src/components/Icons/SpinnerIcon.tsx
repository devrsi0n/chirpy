import * as React from 'react';
import tw from 'twin.macro';

export type SpinnerProps = React.ComponentPropsWithoutRef<'svg'>;

export function SpinnerIcon({ className }: SpinnerProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      css={tw`w-5 h-5 text-white animate-spin`}
      className={className}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" tw="opacity-25"></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        tw="opacity-75"
      ></path>
    </svg>
  );
}
