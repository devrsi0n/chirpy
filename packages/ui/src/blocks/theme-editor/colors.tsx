import { ColorSeriesKey, ResolvedColorMode } from '@chirpy-dev/types';
import {
  amber,
  amberDark,
  blue,
  blueDark,
  green,
  greenDark,
  indigo,
  indigoDark,
  pink,
  pinkDark,
  plum,
  plumDark,
  red,
  redDark,
  violet,
  violetDark,
} from '@radix-ui/colors';
import { useTheme } from 'next-themes';

import { translateRadixColor } from '../../contexts/theme-context/utilities';

export type ColorSeries = {
  light: Record<ColorSeriesKey, string>;
  dark: Record<ColorSeriesKey, string>;
};
export const COLOR_OPTIONS: Record<string, ColorSeries> = {
  red: {
    light: translateRadixColor(red),
    dark: translateRadixColor(redDark),
  },
  amber: {
    light: translateRadixColor(amber),
    dark: translateRadixColor(amberDark),
  },
  green: {
    light: translateRadixColor(green),
    dark: translateRadixColor(greenDark),
  },
  blue: {
    light: translateRadixColor(blue),
    dark: translateRadixColor(blueDark),
  },
  indigo: {
    light: translateRadixColor(indigo),
    dark: translateRadixColor(indigoDark),
  },
  violet: {
    light: translateRadixColor(violet),
    dark: translateRadixColor(violetDark),
  },
  default: {
    light: translateRadixColor(plum),
    dark: translateRadixColor(plumDark),
  },
  pink: {
    light: translateRadixColor(pink),
    dark: translateRadixColor(pinkDark),
  },
};

export type UseActiveColorsOptions = {
  level: ColorSeriesKey;
};

/**
 * Get active colors, active means the theme user is using, `light` or `dark`
 */
export function useColors({
  level,
}: UseActiveColorsOptions): Record<string, string> {
  const activeTheme = useActiveColorMode();
  return Object.entries(COLOR_OPTIONS).reduce((acc, [key, value]) => {
    acc[key] = value[activeTheme][level];
    return acc;
  }, {} as Record<string, string>);
}

export function useActiveColorMode(): ResolvedColorMode {
  const { resolvedTheme } = useTheme();
  const activeTheme =
    (resolvedTheme === 'system' ? 'light' : resolvedTheme) || 'light';
  return activeTheme as ResolvedColorMode;
}
