import * as React from 'react';

export type ItalicIconProps = {
  fill?: string;
};

export function ItalicIcon({ fill = 'currentColor' }: ItalicIconProps): JSX.Element {
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
      <path d="M19 4h-9M14 20H5M15 4L9 20"></path>
    </svg>
  );
}
