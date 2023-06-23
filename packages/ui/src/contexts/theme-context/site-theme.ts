import {
  blue,
  blueDark,
  gray,
  green,
  greenDark,
  indigo,
  indigoDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  plum,
  plumDark,
  red,
  redDark,
  slateDark,
  violet,
  violetDark,
  yellow,
  yellowDark,
} from '@radix-ui/colors';

import { Theme } from '../../../../types/src/theme';
import { translateRadixColor } from './utilities';

const siteColors = getColors();

export const siteTheme: Theme = {
  colors: siteColors,
};

export function getColors() {
  return {
    light: {
      primary: translateRadixColor(violet),
      plum: translateRadixColor(plum),
      gray: translateRadixColor(gray),
      blue: translateRadixColor(blue),
      indigo: translateRadixColor(indigo),
      green: translateRadixColor(green),
      violet: translateRadixColor(violet),
      yellow: translateRadixColor(yellow),
      orange: translateRadixColor(orange),
      red: translateRadixColor(red),
      pink: translateRadixColor(pink),
      bg: 'hsl(210, 20%, 98%)',
    },
    dark: {
      primary: translateRadixColor(violetDark),
      plum: translateRadixColor(plumDark),
      gray: translateRadixColor(slateDark),
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
