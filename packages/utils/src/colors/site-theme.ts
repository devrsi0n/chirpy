import { Theme } from '@chirpy-dev/types';
import {
  violet,
  plum,
  blue,
  indigo,
  green,
  yellow,
  orange,
  red,
  pink,
  violetDark,
  plumDark,
  grayDark,
  blueDark,
  indigoDark,
  greenDark,
  yellowDark,
  orangeDark,
  redDark,
  pinkDark,
  slateDark,
  slate,
} from '@radix-ui/colors';

import { translateRadixColor } from './utilities';

const siteColors = getColors();

export const siteTheme: Theme = {
  colors: siteColors,
};

export function getColors() {
  return {
    light: {
      white: 'hsl(0, 0%, 100%)',
      primary: translateRadixColor(violet),
      plum: translateRadixColor(plum),
      gray: {
        0: 'hsl(0, 0%, 100%)',
        ...translateRadixColor(slate),
      },
      blue: translateRadixColor(blue),
      indigo: translateRadixColor(indigo),
      green: translateRadixColor(green),
      violet: translateRadixColor(violet),
      yellow: translateRadixColor(yellow),
      orange: translateRadixColor(orange),
      red: translateRadixColor(red),
      pink: translateRadixColor(pink),
      bg: 'hsl(0, 0%, 100%)',
    },
    dark: {
      white: 'hsl(0, 0%, 100%)',
      primary: translateRadixColor(violetDark),
      plum: translateRadixColor(plumDark),
      gray: {
        0: grayDark.gray2,
        ...translateRadixColor(slateDark),
      },
      blue: translateRadixColor(blueDark),
      indigo: translateRadixColor(indigoDark),
      green: translateRadixColor(greenDark),
      violet: translateRadixColor(violetDark),
      yellow: translateRadixColor(yellowDark),
      orange: translateRadixColor(orangeDark),
      red: translateRadixColor(redDark),
      pink: translateRadixColor(pinkDark),
      bg: slateDark.slate1,
    },
  };
}
