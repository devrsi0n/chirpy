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
      light: colors.gray['600'],
      '': colors.gray['800'],
      dark: colors.gray['900'],
    },
    background: colors['white'],
  },
  dark: {
    ...darkColors,
    primary: {
      light: colors.indigo['400'],
      '': colors.indigo['500'],
      dark: colors.indigo['600'],
    },
    text: {
      light: colors.gray['500'],
      '': colors.gray['300'],
      dark: colors.gray['100'],
    },
    background: colors['black'],
    gray: {
      100: colors.gray['900'],
      200: colors.gray['800'],
      300: colors.gray['700'],
      400: colors.gray['600'],
      500: colors.gray['500'],
      600: colors.gray['400'],
      700: colors.gray['300'],
      800: colors.gray['200'],
      900: colors.gray['100'],
    },
  },
};
