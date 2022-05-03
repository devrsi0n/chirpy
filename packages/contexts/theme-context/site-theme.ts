import * as radixColors from '@radix-ui/colors';

import { Theme } from '../../types/theme.type';
import { translateRadixColor } from './utilities';

const siteColors = getColors();

export const siteTheme: Theme = {
  colors: siteColors,
};

export function getColors() {
  return {
    light: {
      primary: translateRadixColor(radixColors.violet),
      plum: translateRadixColor(radixColors.plum),
      gray: translateRadixColor(radixColors.gray),
      blue: translateRadixColor(radixColors.blue),
      indigo: translateRadixColor(radixColors.indigo),
      green: translateRadixColor(radixColors.green),
      violet: translateRadixColor(radixColors.violet),
      yellow: translateRadixColor(radixColors.yellow),
      orange: translateRadixColor(radixColors.orange),
      red: translateRadixColor(radixColors.red),
      pink: translateRadixColor(radixColors.pink),
      bg: radixColors.violet.violet1,
    },
    dark: {
      primary: translateRadixColor(radixColors.violetDark),
      plum: translateRadixColor(radixColors.plumDark),
      gray: translateRadixColor(radixColors.mauveDark),
      blue: translateRadixColor(radixColors.blueDark),
      indigo: translateRadixColor(radixColors.indigoDark),
      green: translateRadixColor(radixColors.greenDark),
      violet: translateRadixColor(radixColors.violetDark),
      yellow: translateRadixColor(radixColors.yellowDark),
      orange: translateRadixColor(radixColors.orangeDark),
      red: translateRadixColor(radixColors.redDark),
      pink: translateRadixColor(radixColors.pinkDark),
      bg: radixColors.indigoDark.indigo1,
    },
  };
}
