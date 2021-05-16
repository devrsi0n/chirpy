import { default as TailwindColors } from 'tailwindcss/colors';

import { Theme } from '../../types/theme.type';

export const siteDefaultTheme: Theme = {
  colors: {
    primary: TailwindColors.fuchsia,
  },
};

// function hexToRgbA(hex: string): string {
//   if (/^#([\dA-Fa-f]{3}){1,2}$/.test(hex)) {
//     let hexArray = hex.slice(1).split('');
//     if (hexArray.length === 3) {
//       hexArray = [hexArray[0], hexArray[0], hexArray[1], hexArray[1], hexArray[2], hexArray[2]];
//     }
//     const hexValue = Number.parseInt('0x' + hexArray.join(''), 10);
//     return (
//       'rgba(' + [(hexValue >> 16) & 255, (hexValue >> 8) & 255, hexValue & 255].join(',') + ',1)'
//     );
//   }
//   throw new Error('Bad color Hex');
// }
