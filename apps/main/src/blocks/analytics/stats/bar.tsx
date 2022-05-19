import clsx from 'clsx';
import React from 'react';

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
    <div className="relative w-full" style={{ maxWidth: `calc(100% - ${maxWidthDeduction})` }}>
      <div
        className={clsx('absolute inset-0 h-full dark:bg-grayd-900/25', colorMap[color])}
        style={{ width: `${width}%` }}
      ></div>
      {children}
    </div>
  );
}

const colorMap: Record<BarColor, string> = {
  orange: `bg-orange-200`,
  green: `bg-green-200`,
  red: `bg-red-200`,
  blue: `bg-blue-200`,
};

function barWidth(count: number, all: { [x: string]: any }[]) {
  let maxVal = all[0].count;

  for (const entry of all) {
    if (entry.count > maxVal) maxVal = entry.count;
  }

  return (count / maxVal) * 100;
}
