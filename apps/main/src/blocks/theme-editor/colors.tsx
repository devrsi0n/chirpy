import * as colors from '@radix-ui/colors';

import { translateRadixColor } from '$/contexts/theme-context/utilities';

export type ColorSeries = {
  light: Record<string, string>;
  dark: Record<string, string>;
};
export const colorOptions: Record<string, ColorSeries> = {
  red: {
    light: translateRadixColor(colors.red),
    dark: translateRadixColor(colors.redDark),
  },
  amber: {
    light: translateRadixColor(colors.amber),
    dark: translateRadixColor(colors.amberDark),
  },
  green: {
    light: translateRadixColor(colors.green),
    dark: translateRadixColor(colors.greenDark),
  },
  blue: {
    light: translateRadixColor(colors.blue),
    dark: translateRadixColor(colors.blueDark),
  },
  indigo: {
    light: translateRadixColor(colors.indigo),
    dark: translateRadixColor(colors.indigoDark),
  },
  violet: {
    light: translateRadixColor(colors.violet),
    dark: translateRadixColor(colors.violetDark),
  },
  default: {
    light: translateRadixColor(colors.plum),
    dark: translateRadixColor(colors.plumDark),
  },
  pink: {
    light: translateRadixColor(colors.pink),
    dark: translateRadixColor(colors.pinkDark),
  },
};
