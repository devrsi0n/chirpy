import * as React from 'react';

export type SlashIconProps = React.PropsWithChildren<{
  stroke?: string;
  className?: string;
}>;

export function SlashIcon({ stroke = 'currentColor', className }: SlashIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      stroke={stroke}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      className={className}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  );
}
