import colors from 'tailwindcss/colors';
import { ITheme } from '../types/theme.type';

// const { ...darkColors } = colors;

const gray = colors.gray;

export const colorModes: ITheme = {
  light: {
    // primary, Purple, Used as the primary color.
    primary: {
      light: colors.violet[300],
      '': colors.violet[500],
      dark: colors.violet[700],
    },
    // Secondary, Blue, Used for accents & actions.
    secondary: {
      light: colors.pink[300],
      '': colors.pink[500],
      dark: colors.pink[700],
    },
    // Error, red, Used for error states.
    error: {
      light: colors.red[300],
      '': colors.red[500],
      dark: colors.red[700],
    },
    // Green, Used for success states.
    success: {
      light: colors.emerald[300],
      '': colors.emerald[500],
      dark: colors.emerald[700],
    },
    // yellow, Used to represent caution.
    warn: {
      light: colors.amber[300],
      '': colors.amber[500],
      dark: colors.amber[700],
    },
    text: {
      light: gray['600'],
      '': gray['700'],
      active: gray['800'],
      placeholder: gray['500'],
      inverse: colors.white,
    },
    background: {
      secondary: gray['200'],
      inverse: gray['800'],
      '': colors.white,
    },
    gray,
    divider: gray['300'],
    white: {
      '': colors.white,
      light: 'rgba(255, 255, 255, 0.7)',
    },
  },
  dark: {
    primary: {
      light: colors.violet[700],
      '': colors.violet[500],
      dark: colors.violet[300],
    },
    // Secondary, Blue, Used for accents & actions.
    secondary: {
      light: colors.pink[300],
      '': colors.pink[500],
      dark: colors.pink[700],
    },
    // Error, red, Used for error states.
    error: {
      light: colors.red[700],
      '': colors.red[500],
      dark: colors.red[300],
    },
    // Green, Used for success states.
    success: {
      light: colors.emerald[700],
      '': colors.emerald[500],
      dark: colors.emerald[300],
    },
    // yellow, Used to represent caution.
    warn: {
      light: colors.amber[700],
      '': colors.amber[500],
      dark: colors.amber[300],
    },
    text: {
      light: gray['400'],
      '': gray['100'],
      active: gray['200'],
      placeholder: gray['700'],
      inverse: colors.black,
    },
    background: {
      secondary: gray['900'],
      inverse: gray['200'],
      '': colors.black,
    },
    gray: {
      50: gray['900'],
      100: gray['800'],
      200: gray['700'],
      300: gray['600'],
      400: gray['500'],
      500: gray['400'],
      600: gray['300'],
      700: gray['200'],
      800: gray['100'],
      900: gray['50'],
    },
    divider: gray['700'],
    white: {
      '': colors.black,
      light: 'rgba(0, 0, 0, 0.7)',
    },
  },
};
