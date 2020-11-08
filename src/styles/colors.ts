import defaultTheme from 'tailwindcss/defaultTheme';
import { ITheme } from '../types/theme.type';

const { colors } = defaultTheme;
// const { ...darkColors } = colors;

const gray = {
  // Off-white, Used to avoid darkmode strain.
  100: '#FCFCFC',
  // Background, Used for element backgrounds.
  200: '#F7F7FC',
  // Input Background, Used for input bg accessibility.
  300: '#EFF0F7',
  // Line, Used for line based elements.
  400: '#D6D8E7',
  // Placeholder, Used for initial copy of inputs.
  500: '#A0A3BD',
  // Label, Used for the label text.
  600: '#6E7191',
  // Body, Used for body copy text
  700: '#4E4B66',
  // Title-Active, Used for both links and titles.
  800: '#14142B',
  900: '#030310',
};

export const colorModes: ITheme = {
  light: {
    // primary, Purple, Used as the primary color.
    primary: {
      light: '#DED3FF',
      '': '#5F2EEA',
      dark: '#2A00A2',
    },
    // Secondary, Blue, Used for accents & actions.
    secondary: {
      light: '#D5F7FF',
      '': '#1CC8EE',
      dark: '#0096B7',
    },
    // Error, red, Used for error states.
    error: {
      light: '#FFF2F7',
      '': '#ED2E7E',
      dark: '#C30052',
    },
    // Green, Used for success states.
    success: {
      light: '#F3FDFA',
      '': '#00BA88',
      dark: '#00966D',
    },
    // yellow, Used to represent caution.
    warn: {
      light: '#FFF0D4',
      '': '#F4B740',
      dark: '#A26B00',
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
      '': gray['100'],
    },
    gray,
    divider: gray['300'],
  },
  dark: {
    primary: {
      dark: '#DED3FF',
      '': '#5F2EEA',
      light: '#2A00A2',
    },
    // Secondary, Blue, Used for accents & actions.
    secondary: {
      dark: '#D5F7FF',
      '': '#1CC8EE',
      light: '#0096B7',
    },
    // Error, red, Used for error states.
    error: {
      light: '#FFF2F7',
      '': '#ED2E7E',
      dark: '#C30052',
    },
    // Green, Used for success states.
    success: {
      dark: '#F3FDFA',
      '': '#00BA88',
      light: '#00966D',
    },
    // yellow, Used to represent caution.
    warn: {
      dark: '#FFF0D4',
      '': '#F4B740',
      light: '#A26B00',
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
    divider: gray['700'],
  },
};
