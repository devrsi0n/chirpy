import { Color } from '@tremor/react';

// https://www.tremor.so/docs/layout/color-palette
const tremorColors: Record<Color, string> = {
  amber: '#f59e0b',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  emerald: '#10b981',
  fuchsia: '#d946ef',
  gray: '#6b7280',
  green: '#22c55e',
  indigo: '#6366f1',
  lime: '#84cc16',
  neutral: '#737373',
  orange: '#f97316',
  pink: '#ec4899',
  purple: '#a855f7',
  red: '#ef4444',
  rose: '#f43f5e',
  sky: '#0ea5e9',
  slate: '#64748b',
  stone: '#78716c',
  teal: '#14b8a6',
  violet: '#8b5cf6',
  yellow: '#eab308',
  zinc: '#71717a',
};

export const tremorPieChartColors: [Color, string][] = [
  ['blue', tremorColors.blue],
  ['sky', tremorColors.sky],
  ['cyan', tremorColors.cyan],
  ['teal', tremorColors.teal],
  ['indigo', tremorColors.indigo],
  ['violet', tremorColors.violet],
];

export const tremorColorNames = Object.keys(tremorColors) as Color[];
export const tremorColorCodes = Object.values(tremorColors);

export default tremorColors;
