import * as React from 'react';

export type BoldIconProps = {
  fill?: string;
};

export function BoldIcon({ fill = 'currentColor' }: BoldIconProps): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color={fill}
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"></path>
    </svg>
  );
}
