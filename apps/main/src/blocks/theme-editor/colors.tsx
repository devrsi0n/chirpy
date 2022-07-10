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

import { translateRadixColor } from '$/contexts/theme-context/utilities';

export type ColorSeries = {
  light: Record<string, string>;
  dark: Record<string, string>;
};
export const colorOptions: Record<string, ColorSeries> = {
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
