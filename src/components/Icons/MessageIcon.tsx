import * as React from 'react';

export type MessageIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

export function MessageIcon({
  color = 'currentColor',
  ...svgProps
}: MessageIconProps): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color={color}
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
      {...svgProps}
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
    </svg>
  );
}
