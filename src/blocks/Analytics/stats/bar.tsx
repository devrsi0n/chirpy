import React from 'react';
import tw, { TwStyle } from 'twin.macro';

export type BarColor = 'orange' | 'green' | 'red' | 'blue';

export type BarProps = {
  count: number;
  all: { [x: string]: any }[];
  color: BarColor;
  maxWidthDeduction: string;
  children: React.ReactNode;
};

export default function Bar({
  count,
  all,
  color,
  maxWidthDeduction,
  children,
}: BarProps): JSX.Element {
  const width = barWidth(count, all);

  return (
    <div className="w-full relative" style={{ maxWidth: `calc(100% - ${maxWidthDeduction})` }}>
      <div
        tw="absolute inset-0 h-full dark:bg-grayd-900/25"
        css={colorMap[color]}
        style={{ width: `${width}%` }}
      ></div>
      {children}
    </div>
  );
}

const colorMap: Record<BarColor, TwStyle> = {
  orange: tw`bg-orange-200`,
  green: tw`bg-green-200`,
  red: tw`bg-red-200`,
  blue: tw`bg-blue-200`,
};

function barWidth(count: number, all: { [x: string]: any }[]) {
  let maxVal = all[0].count;

  for (const entry of all) {
    if (entry.count > maxVal) maxVal = entry.count;
  }

  return (count / maxVal) * 100;
}
