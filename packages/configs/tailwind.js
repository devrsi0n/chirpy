// @ts-nocheck
const defaultTheme = require('tailwindcss/defaultTheme');
const radixColors = require('@radix-ui/colors');
const convert = require('color-convert');
const plugin = require('tailwindcss/plugin');

const colors = {
  // dynamic colors
  blue: getColorCSSVariables('blue'),
  indigo: getColorCSSVariables('indigo'),
  green: getColorCSSVariables('green'),
  gray: getColorCSSVariables('gray', true, 0),

  violet: getColorCSSVariables('violet'),
  plum: getColorCSSVariables('plum'),
  primary: getColorCSSVariables('primary'),
  yellow: getColorCSSVariables('yellow'),
  orange: getColorCSSVariables('orange'),
  red: getColorCSSVariables('red'),
  whitea: getColorCSSVariables('whitea', false),
  blacka: getColorCSSVariables('blacka', false),
  pink: getColorCSSVariables('pink'),
  bg: `hsl(var(--tw-colors-bg) / <alpha-value>)`,
  // static colors
  grayd: getRadixColor(radixColors.grayDark, 'gray'),
  grayl: getRadixColor(radixColors.gray, 'gray'),
  white: '#fff',
  black: '#000',
  current: 'currentColor',
  transparent: 'transparent',
};

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.\d+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px) => `${round(px / 16)}rem`;
// const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    './node_modules/@chirpy-dev/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    colors,
    boxShadow: {
      // TODO: Use css variable to fix dark mode
      xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
      md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
      DEFAULT:
        '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
      lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
      xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
      '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
      '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
      none: '0 0 #0000',
    },
    extend: {
      // For analytics
      colors: {
        'gray-950': 'rgb(13, 18, 30)',
        'gray-850': 'rgb(26, 32, 44)',
        'gray-825': 'rgb(37, 47, 63)',
      },
      spacing: {
        44: '11rem',
      },
      width: {
        '31percent': '31%',
      },
      opacity: {
        15: '0.15',
      },
      zIndex: {
        9: 9,
      },
      maxWidth: {
        '2xs': '15rem',
        '3xs': '12rem',
      },

      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      fill: colors,
      borderColor: (theme) => ({
        DEFAULT: theme('colors.gray.700/1', 'currentColor'),
      }),
      ringColor: (theme) => ({
        DEFAULT: theme('colors.gray.700/1', 'currentColor'),
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

      typography: ({ theme }) => {
        // Fix build error
        theme = theme || (() => {});
        return {
          DEFAULT: {
            css: {
              '--tw-prose-body': theme('colors.gray[1100]/1'),
              '--tw-prose-headings': theme('colors.gray[1200]/1'),
              '--tw-prose-lead': theme('colors.gray[1000]/1'),
              '--tw-prose-links': theme('colors.gray[1200]/1'),
              '--tw-prose-bold': theme('colors.gray[1200]/1'),
              '--tw-prose-counters': theme('colors.gray[[900]]/1'),
              '--tw-prose-bullets': theme('colors.gray[900]/1'),
              '--tw-prose-hr': theme('colors.gray[600]/1'),
              '--tw-prose-quotes': theme('colors.gray[1200]/1'),
              '--tw-prose-quote-borders': theme('colors.gray[600]/1'),
              '--tw-prose-captions': theme('colors.gray[1000]/1'),
              '--tw-prose-code': theme('colors.pink[1100]/1'),
              '--tw-prose-pre-code': theme('colors.gray[100]/1'),
              '--tw-prose-pre-bg': theme('colors.gray[1200]/1'),
              '--tw-prose-th-borders': theme('colors.gray[600]/1'),
              '--tw-prose-td-borders': theme('colors.gray[200]/1'),
              '--tw-prose-invert-body': theme('colors.gray[200]/1'),
              '--tw-prose-invert-headings': theme('colors.white'),
              '--tw-prose-invert-lead': theme('colors.gray[600]/1'),
              '--tw-prose-invert-links': theme('colors.white'),
              '--tw-prose-invert-bold': theme('colors.white'),
              '--tw-prose-invert-counters': theme('colors.gray[700]/1'),
              '--tw-prose-invert-bullets': theme('colors.gray[[900]]/1'),
              '--tw-prose-invert-hr': theme('colors.gray[1000]/1'),
              '--tw-prose-invert-quotes': theme('colors.gray[100]/1'),
              '--tw-prose-invert-quote-borders': theme('colors.gray[1000]/1'),
              '--tw-prose-invert-captions': theme('colors.gray[700]/1'),
              '--tw-prose-invert-code': theme('colors.white'),
              '--tw-prose-invert-pre-code': theme('colors.gray[600]/1'),
              '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
              '--tw-prose-invert-th-borders': theme('colors.gray[[900]]/1'),
              '--tw-prose-invert-td-borders': theme('colors.gray[1000]/1'),
              code: {
                color: 'var(--tw-prose-code)',
                borderRadius: rem(4),
                fontWeight: 'normal',
              },
              pre: {
                // Reset colors as we already have a theme highlighter
                color: '',
                backgroundColor: '',
                overflowX: 'auto',
                fontWeight: '400',
              },
            },
          },
        };
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`,
          )}`;
        });
      });
    }),
  ],
};

function getColorCSSVariables(name, modernAlpha = true, startAt = 1) {
  const result = {};
  for (let i = startAt; i <= 12; i++) {
    result[i * 100] = `${
      modernAlpha ? 'hsl' : 'hsla'
    }(var(--tw-colors-${name}-${i * 100})${
      modernAlpha ? ' / <alpha-value>' : ''
    })`;
  }
  return result;
}

function getRadixColor(colors, prefix) {
  const result = {};
  for (let i = 1; i <= 12; i++) {
    const color = colors[`${prefix}${i}`];
    const [, h, s, l] = /hsl\((\d+), ([\d.]+)%, ([\d.]+)%\)/.exec(color);
    const rgb = convert.hsl
      .rgb(+h, +s, +l)
      .map((c) => c.toString(16))
      .join('');
    result[i * 100] = `#${rgb}`;
  }
  return result;
}
