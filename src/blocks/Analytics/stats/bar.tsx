import React from 'react';

function barWidth(count: number, all: { [x: string]: any }[]) {
  let maxVal = all[0].count;

  for (const entry of all) {
    if (entry.count > maxVal) maxVal = entry.count;
  }

  return (count / maxVal) * 100;
}

export type BarProps = {
  count: number;
  all: { [x: string]: any }[];
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
}: BarProps): JSX.Element {
  const width = barWidth(count, all);

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
