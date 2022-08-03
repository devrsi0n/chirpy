import {
  violet,
  plum,
  gray,
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
  mauveDark,
  blueDark,
  indigoDark,
  greenDark,
  yellowDark,
  orangeDark,
  redDark,
  pinkDark,
  slateDark,
} from '@radix-ui/colors';

import { Theme } from '../../types/theme.type';
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
      gray: {
        0: 'hsl(0, 0%, 100%)',
        ...translateRadixColor(gray),
      },
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
      gray: {
        0: grayDark.gray2,
        ...translateRadixColor(mauveDark),
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
