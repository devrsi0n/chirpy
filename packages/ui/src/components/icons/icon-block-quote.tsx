import { IIconProps } from './types';

export interface IIconBlockQuoteProps extends IIconProps {
  //
}

export function IconBlockQuote({ size, className }: IIconBlockQuoteProps) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <circle r="3" strokeWidth="2" cx="7" cy="9.5"></circle>
      <line
        strokeWidth="2"
        x1="7"
        y1="17.5"
        x2="9.78107"
        y2="10.62500"
        strokeLinecap="round"
      ></line>
      <circle r="3" strokeWidth="2" cx="17" cy="9.5"></circle>
      <line
        strokeWidth="2"
        x1="17"
        y1="17.5"
        x2="19.78107"
        y2="10.62500"
        strokeLinecap="round"
      ></line>
    </svg>
  );
}
