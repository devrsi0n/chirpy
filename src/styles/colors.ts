import defaultTheme from 'tailwindcss/defaultTheme';
import { ITheme } from '../types/theme.type';

const { colors } = defaultTheme;
const { gray, ...darkColors } = colors;

export const colorModes: ITheme = {
  light: {
    ...colors,
    primary: {
      light: colors.indigo['400'],
      '': colors.indigo['500'],
      dark: colors.indigo['600'],
    },
    text: {
      light: gray['600'],
      '': gray['900'],
      secondary: gray['700'],
      placeholder: gray['300'],
      inverse: colors.white,
    },
    background: {
      secondary: gray['100'],
      inverse: gray['800'],
      '': colors.white,
    },
    divider: gray['200'],
  },
  dark: {
    ...darkColors,
    primary: {
      light: colors.indigo['400'],
      '': colors.indigo['500'],
      dark: colors.indigo['600'],
    },
    text: {
      light: gray['400'],
      '': gray['100'],
      secondary: gray['300'],
      placeholder: gray['700'],
      inverse: colors.black,
    },
    background: {
      secondary: gray['900'],
      inverse: gray['200'],
      '': colors.black,
    },
    gray: {
      100: gray['900'],
      200: gray['800'],
      300: gray['700'],
      400: gray['600'],
      500: gray['500'],
      600: gray['400'],
      700: gray['300'],
      800: gray['200'],
      900: gray['100'],
    },
    divider: gray['800'],
  },
};
