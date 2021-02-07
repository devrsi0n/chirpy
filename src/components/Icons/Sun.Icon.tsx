import * as React from 'react';

export type ISunIconProps = React.ComponentProps<'svg'> & {
  size?: number;
};

export function SunIcon({ size, ...svgProps }: ISunIconProps): JSX.Element {
  return (
    <svg
      {...svgProps}
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99305 10C5.99305 12.761 8.23905 15.007 11 15.007C13.761 15.007 16.007 12.761 16.007 10C16.007 7.239 13.761 4.993 11 4.993C8.23905 4.993 5.99305 7.239 5.99305 10ZM11 6.993C12.658 6.993 14.007 8.342 14.007 10C14.007 11.658 12.658 13.007 11 13.007C9.34205 13.007 7.99305 11.658 7.99305 10C7.99305 8.342 9.34205 6.993 11 6.993ZM9.99805 17H11.998V20H9.99805V17ZM9.99805 0H11.998V3H9.99805V0ZM0.998047 9H3.99805V11H0.998047V9ZM17.998 9H20.998V11H17.998V9Z"
        fill="currentColor"
      />
      <path
        d="M3.21909 16.3634L5.33978 14.2414L6.75442 15.6552L4.63373 17.7772L3.21909 16.3634Z"
        fill="currentColor"
      />
      <path
        d="M15.2403 4.34358L17.3623 2.22152L18.7765 3.63571L16.6545 5.75777L15.2403 4.34358Z"
        fill="currentColor"
      />
      <path
        d="M5.34178 5.75858L3.22109 3.63663L4.63573 2.22284L6.75642 4.34479L5.34178 5.75858Z"
        fill="currentColor"
      />
      <path
        d="M18.7758 16.3635L17.3616 17.7778L15.2396 15.6558L16.6538 14.2415L18.7758 16.3635Z"
        fill="currentColor"
      />
    </svg>
  );
}
