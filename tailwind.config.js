// @ts-nocheck
const defaultTheme = require('tailwindcss/defaultTheme');
const radixColors = require('@radix-ui/colors');
const convert = require('color-convert');

const colors = {
  // dynamic colors
  blue: getColorCSSVariables('blue'),
  indigo: getColorCSSVariables('indigo'),
  green: getColorCSSVariables('green'),
  gray: getColorCSSVariables('gray'),
  violet: getColorCSSVariables('violet'),
  plum: getColorCSSVariables('plum'),
  primary: getColorCSSVariables('primary'),
  yellow: getColorCSSVariables('yellow'),
  orange: getColorCSSVariables('orange'),
  red: getColorCSSVariables('red'),
  whitea: getColorCSSVariables('whitea'),
  blacka: getColorCSSVariables('blacka'),
  pink: getColorCSSVariables('pink'),
  bg: `var(--tw-colors-bg)`,
  // static colors
  grayd: getRadixColor(radixColors.grayDark, 'gray'),
  grayl: getRadixColor(radixColors.gray, 'gray'),
  white: '#fff',
  black: '#000',
  current: 'currentColor',
  transparent: 'transparent',
};

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  darkMode: 'class',
  purge: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/blocks/**/*.{ts,tsx}',
  ],
  theme: {
    colors,
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      fill: colors,
      borderColor: (theme) => ({
        DEFAULT: theme('colors.gray.700', 'currentColor'),
      }),
      ringColor: (theme) => ({
        DEFAULT: theme('colors.gray.700', 'currentColor'),
      }),
      screens: {
        xs: '375px',
      },
      outlineWidth: {
        DEFAULT: '1px',
        0: '0',
        md: '2px',
        lg: '4px',
      },
      flex: {
        2: '2 2 0%',
      },
      scale: {
        '-1': '-1',
      },
      width: {
        fit: 'fit-content',
      },
      height: {
        fit: 'fit-content',
      },
    },
  },
  plugins: [require('./scripts/tailwindcss-typography')],
};

function getColorCSSVariables(name) {
  const result = {};
  for (let i = 1; i <= 12; i++) {
    result[i * 100] = `var(--tw-colors-${name}-${i * 100})`;
  }
  return result;
}

function getRadixColor(colors, prefix) {
  const result = {};
  for (let i = 1; i <= 12; i++) {
    const color = colors[`${prefix}${i}`];
    const [, h, s, l] = /hsl\((\d+) ([\d\.]+)\% ([\d\.]+)\%\)/.exec(color);
    const rgb = convert.hsl
      .rgb(+h, +s, +l)
      .map((c) => c.toString(16))
      .join('');
    result[i * 100] = `#${rgb}`;
  }
  return result;
}
