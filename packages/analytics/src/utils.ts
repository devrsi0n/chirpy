export const cx = (...args: (string | undefined | false)[]) =>
  args.filter(Boolean).join(' ');

export const formatNumber = (num: number) => Intl.NumberFormat().format(+num);

export function kFormatter(value: number): string {
  return value > 999 ? `${(value / 1000).toFixed(1)}K` : String(value);
}

const padTo2Digits = (value: number) => value.toString().padStart(2, '0');

export function formatMinSec(totalSeconds: number) {
  if (Number.isNaN(totalSeconds)) return '0s';

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes ? `${minutes}m` : ''} ${padTo2Digits(seconds)}s`;
}

export function formatPercentage(value: number) {
  return `${value ? (value * 100).toFixed(2) : '0'}%`;
}
