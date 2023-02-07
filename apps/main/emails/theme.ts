import { Colors, ColorSeries } from '@chirpy-dev/types';
import { siteTheme } from '@chirpy-dev/utils';
// @ts-ignore
import convert from 'color-convert';

export const colors: Required<Colors> = {
  gray: getRadixColor(siteTheme.colors.light.gray!),
  primary: getRadixColor(siteTheme.colors.light.primary!),
  pink: getRadixColor(siteTheme.colors.light.pink!),
  bg: '#fff',
};

function getRadixColor(colors: ColorSeries): ColorSeries {
  const result = {};
  for (let i = 100; i <= 1200; i += 100) {
    // @ts-ignore
    const color = colors[i];
    const [, h, s, l] = /hsl\((\d+), ([\d.]+)%, ([\d.]+)%\)/.exec(color) || [];
    const rgb = convert.hsl
      .rgb(+h, +s, +l)
      // @ts-ignore
      .map((c) => c.toString(16))
      .join('');
    // @ts-ignore
    result[i] = `#${rgb}`;
  }
  return result as ColorSeries;
}

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 28,
} as const;

export const lineHeight = {
  tight: '115%',
  base: '150%',
  relaxed: '185%',
} as const;

export const fontWeight = {
  normal: 400,
  semibold: 600,
  bold: 700,
} as const;

export const borderRadius = {
  sm: 8,
  base: 16,
  full: 9999,
} as const;

export const fontFamily = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
} as const;

export const spacing = {
  s0: 0,
  s1: 4,
  s3: 8,
  s4: 12,
  s5: 16,
  s6: 20,
  s7: 24,
  s8: 32,
  s9: 40,
  s10: 48,
  s11: 56,
} as const;

export const screens = {
  xs: '480px',
  sm: '640px',
} as const;

export const themeDefaults = {
  fontFamily: fontFamily.sans,
  lineHeight: lineHeight.base,
  fontWeight: fontWeight.normal,
  fontSize: fontSize.base,
  color: colors.gray[1200],
  padding: 0,
} as const;
