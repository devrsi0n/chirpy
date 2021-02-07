import * as React from 'react';

export type IMoonIconProps = React.ComponentProps<'svg'> & {
  size?: number;
};

export function MoonIcon({ size, ...svgProps }: IMoonIconProps): JSX.Element {
  return (
    <svg
      {...svgProps}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.97101 20C9.67014 20 9.36927 20 9.06841 20C3.55246 19.4975 -0.459131 14.5729 0.0423182 9.04523C0.443478 4.22111 4.25449 0.40201 9.06841 0C9.46956 0 9.87072 0.201005 10.0713 0.502513C10.2719 0.80402 10.2719 1.30653 9.97101 1.60804C8.96812 2.91457 8.66725 4.52261 8.86783 6.13065C9.06841 7.73869 9.97101 9.14573 11.2748 10.0503C13.3809 11.6583 16.2893 11.6583 18.3954 10.0503C18.6962 9.84925 19.0974 9.74874 19.4986 9.94975C19.7994 10.1508 20 10.5528 20 10.9548C19.7994 13.6683 18.4957 16.0804 16.3896 17.7889C14.4841 19.196 12.2777 20 9.97101 20ZM7.1629 2.31156C4.25449 3.31658 2.24869 5.92965 1.94783 9.14573C1.54667 13.5678 4.75594 17.4874 9.1687 17.8894C11.2748 18.0905 13.3809 17.4874 14.9855 16.0804C16.0887 15.1759 16.891 13.9698 17.3925 12.6633C14.8852 13.5678 12.0771 13.1658 9.87072 11.5578C8.1658 10.2513 7.06261 8.44221 6.66145 6.33166C6.56116 4.92462 6.76174 3.61809 7.1629 2.31156Z"
        fill="currentColor"
      />
    </svg>
  );
}
