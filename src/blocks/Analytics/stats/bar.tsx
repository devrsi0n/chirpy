import React from 'react';

function barWidth(count: number, all: { [x: string]: any }[], plot: string) {
  let maxVal = all[0][plot];

  for (const val of all) {
    if (val > maxVal) maxVal = val[plot];
  }

  return (count / maxVal) * 100;
}

export type BarProps = {
  count: number;
  all: { [x: string]: any }[];
  plot?: string;
  className?: string;
  maxWidthDeduction: string;
  children: React.ReactNode;
};

export default function Bar({
  count,
  all,
  className,
  maxWidthDeduction,
  children,
  plot = 'visitors',
}: BarProps): JSX.Element {
  const width = barWidth(count, all, plot);

  return (
    <div className="w-full relative" style={{ maxWidth: `calc(100% - ${maxWidthDeduction})` }}>
      <div
        className={`absolute inset-0 h-full ${className || ''}`}
        style={{ width: `${width}%` }}
      ></div>
      {children}
    </div>
  );
}
