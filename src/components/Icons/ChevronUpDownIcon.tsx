import * as React from 'react';

export type ChevronUpDownIconProps = {
  stroke?: string;
};

export function ChevronUpDownIcon({
  stroke = 'currentColor',
}: ChevronUpDownIconProps): JSX.Element {
  return (
    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke={stroke}>
      <path
        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
