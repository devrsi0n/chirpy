import * as radixColors from '@radix-ui/colors';

import { Theme } from '../../types/theme.type';
import { translateRadixColor } from './utilities';

const siteColors = getColors();

export const siteDefaultTheme: Theme = {
  colors: siteColors,
};

export function getColors() {
  return {
    light: {
      primary: translateRadixColor(radixColors.plum),
      plum: translateRadixColor(radixColors.plum),
      gray: translateRadixColor(radixColors.gray),
      blue: translateRadixColor(radixColors.blue),
      green: translateRadixColor(radixColors.green),
      violet: translateRadixColor(radixColors.violet),
      yellow: translateRadixColor(radixColors.yellow),
      red: translateRadixColor(radixColors.red),
      pink: translateRadixColor(radixColors.pink),
      bg: radixColors.slate.slate2,
    },
    dark: {
      primary: translateRadixColor(radixColors.plumDark),
      plum: translateRadixColor(radixColors.plumDark),
      gray: translateRadixColor(radixColors.mauveDark),
      blue: translateRadixColor(radixColors.blueDark),
      green: translateRadixColor(radixColors.greenDark),
      violet: translateRadixColor(radixColors.violetDark),
      yellow: translateRadixColor(radixColors.yellowDark),
      red: translateRadixColor(radixColors.redDark),
      pink: translateRadixColor(radixColors.pinkDark),
      bg: radixColors.mauveDark.mauve1,
    },
  };
}
