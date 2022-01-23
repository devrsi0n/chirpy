import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { APP_NAME } from '$/lib/constants';

import { Badge } from '../badge';
import { Link, LinkProps } from '../link';

type Size = 'sm' | 'md' | 'lg';
export type LogoProps = {
  size?: Size;
  hideSpacing?: boolean;
  className?: string;
  linkProps?: Partial<LinkProps>;
  showBadge?: boolean;
};

const sizeWidth: Record<Size, TwStyle> = {
  sm: tw`w-16`,
  md: tw`w-24`,
  lg: tw`w-32`,
};

const sizeSpacing: Record<Size, TwStyle> = {
  sm: tw`px-1`,
  md: tw`px-2 py-1`,
  lg: tw`px-3 py-2`,
};

export function Logo({
  size = 'md',
  hideSpacing,
  className,
  linkProps,
  showBadge,
}: LogoProps): JSX.Element {
  return (
    <Link
      className={className}
      href="/"
      aria-label={`Logo of ${APP_NAME}`}
      variant="plain"
      tw="text-violet-900 relative"
      {...linkProps}
    >
      {showBadge && <Badge tw="absolute -right-2 -top-3 leading-none">Beta</Badge>}
      {/* Source Sans Pro, font weight 600 */}
      <svg
        css={[sizeWidth[size], !hideSpacing && sizeSpacing[size]]}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 282 91"
      >
        <path
          fill="currentColor"
          d="M34.40 72L34.40 72Q28.20 72 22.80 69.80Q17.40 67.60 13.45 63.30Q9.50 59 7.20 52.70Q4.90 46.40 4.90 38.30L4.90 38.30Q4.90 30.30 7.25 23.95Q9.60 17.60 13.65 13.20Q17.70 8.80 23.15 6.50Q28.60 4.20 34.80 4.20L34.80 4.20Q41 4.20 45.80 6.70Q50.60 9.20 53.70 12.50L53.70 12.50L47.50 20.00Q44.90 17.40 41.90 15.85Q38.90 14.30 35.10 14.30L35.10 14.30Q31.10 14.30 27.75 15.95Q24.40 17.60 21.95 20.65Q19.50 23.70 18.15 28.10Q16.80 32.50 16.80 38.00L16.80 38.00Q16.80 49.20 21.65 55.55Q26.50 61.90 34.80 61.90L34.80 61.90Q39.20 61.90 42.60 60.05Q46 58.20 48.80 55.20L48.80 55.20L55 62.50Q51 67.10 45.85 69.55Q40.70 72 34.40 72ZM76.40 70.80L64.90 70.80L64.90 0.20L76.40 0.20L76.40 18.40L76 27.90Q79.10 25.00 82.85 22.75Q86.60 20.50 91.70 20.50L91.70 20.50Q99.60 20.50 103.20 25.55Q106.80 30.60 106.80 40L106.80 40L106.80 70.80L95.30 70.80L95.30 41.50Q95.30 35.40 93.50 32.90Q91.70 30.40 87.60 30.40L87.60 30.40Q84.40 30.40 81.95 31.95Q79.50 33.50 76.40 36.50L76.40 36.50L76.40 70.80ZM132.20 70.80L120.70 70.80L120.70 21.70L132.20 21.70L132.20 70.80ZM126.50 13.10L126.50 13.10Q123.40 13.10 121.40 11.30Q119.40 9.50 119.40 6.60L119.40 6.60Q119.40 3.70 121.40 1.85Q123.40 0 126.50 0L126.50 0Q129.60 0 131.60 1.85Q133.60 3.70 133.60 6.60L133.60 6.60Q133.60 9.50 131.60 11.30Q129.60 13.10 126.50 13.10ZM158.40 70.80L146.90 70.80L146.90 21.70L156.40 21.70L157.20 30.40L157.60 30.40Q160.20 25.60 163.90 23.05Q167.60 20.50 171.50 20.50L171.50 20.50Q175.00 20.50 177.10 21.50L177.10 21.50L175.10 31.50Q173.80 31.10 172.70 30.90Q171.60 30.70 170.00 30.70L170.00 30.70Q167.10 30.70 163.90 32.95Q160.70 35.20 158.40 40.80L158.40 40.80L158.40 70.80ZM195.70 90.20L184.20 90.20L184.20 21.70L193.70 21.70L194.50 26.90L194.90 26.90Q198.00 24.30 201.80 22.40Q205.60 20.50 209.70 20.50L209.70 20.50Q214.30 20.50 217.85 22.25Q221.40 24.00 223.90 27.30Q226.40 30.60 227.70 35.20Q229.00 39.80 229.00 45.50L229.00 45.50Q229.00 51.80 227.25 56.75Q225.50 61.70 222.60 65.05Q219.70 68.40 215.90 70.20Q212.10 72 208.00 72L208.00 72Q204.80 72 201.60 70.60Q198.40 69.20 195.40 66.60L195.40 66.60L195.70 74.80L195.70 90.20ZM205.60 62.50L205.60 62.50Q210.50 62.50 213.80 58.25Q217.10 54 217.10 45.60L217.10 45.60Q217.10 38.20 214.60 34.10Q212.10 30.00 206.50 30.00L206.50 30.00Q201.30 30.00 195.70 35.50L195.70 35.50L195.70 58.40Q198.40 60.70 200.90 61.60Q203.40 62.50 205.60 62.50ZM243.30 91L243.30 91Q241.30 91 239.80 90.75Q238.30 90.50 236.90 90L236.90 90L239.00 81Q239.70 81.20 240.65 81.45Q241.60 81.70 242.50 81.70L242.50 81.70Q246.40 81.70 248.75 79.35Q251.10 77 252.30 73.30L252.30 73.30L253.20 70.20L233.90 21.70L245.60 21.70L254.10 45.80Q255.20 49 256.25 52.55Q257.30 56.10 258.40 59.60L258.40 59.60L258.80 59.60Q259.70 56.20 260.65 52.65Q261.60 49.10 262.50 45.80L262.50 45.80L269.90 21.70L281.00 21.70L263.20 73Q261.70 77.20 259.90 80.50Q258.10 83.80 255.75 86.15Q253.40 88.50 250.35 89.75Q247.30 91 243.30 91Z"
        ></path>
      </svg>
    </Link>
  );
}
