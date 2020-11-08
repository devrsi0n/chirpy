const defaultTheme = require('tailwindcss/defaultTheme');

const isEnvProd = process.env.NODE_ENV === 'production';

module.exports = {
  purge: isEnvProd ? ['./src/**/*.tsx'] : [],
  theme: {
    fontFamily: {
      sans: [
        'Poppins',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    fontSize: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      md: 'var(--text-md)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
      '3xl': 'var(--text-3xl)',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',

      primary: {
        light: 'var(--colors-primary-light)',
        default: 'var(--colors-primary)',
        dark: 'var(--colors-primary-dark)',
      },
      // Secondary, Blue, Used for accents & actions.
      secondary: {
        light: 'var(--colors-secondary-light)',
        '': 'var(--colors-secondary)',
        dark: 'var(--colors-secondary-dark)',
      },
      // Error, red, Used for error states.
      error: {
        light: 'var(--colors-error-light)',
        '': 'var(--colors-error)',
        dark: 'var(--colors-error-dark)',
      },
      // Green, Used for success states.
      success: {
        light: 'var(--colors-success-light)',
        '': 'var(--colors-success)',
        dark: 'var(--colors-success-dark)',
      },
      // yellow, Used to represent caution.
      warn: {
        light: 'var(--colors-warn-light)',
        '': 'var(--colors-warn)',
        dark: 'var(--colors-warn-dark)',
      },
      text: {
        default: 'var(--colors-text)',
        inverse: 'var(--colors-text-inverse)',
        active: 'var(--colors-text-active)',
        placeholder: 'var(--colors-text-placeholder)',
        light: 'var(--colors-text-light)',
      },
      background: {
        default: 'var(--colors-background)',
        secondary: 'var(--colors-background-secondary)',
        inverse: 'var(--colors-background-inverse)',
      },
      divider: 'var(--colors-divider)',
      borderColor: {
        default: 'var(--colors-divider)',
      },
      fill: {
        current: 'currentColor',
        default: 'var(--colors-text)',
        inverse: 'var(--colors-text-inverse)',
        secondary: 'var(--colors-text-secondary)',
        placeholder: 'var(--colors-text-placeholder)',
        light: 'var(--colors-text-light)',
      },
      gray: {
        100: 'var(--colors-gray-100)',
        200: 'var(--colors-gray-200)',
        300: 'var(--colors-gray-300)',
        400: 'var(--colors-gray-400)',
        500: 'var(--colors-gray-500)',
        600: 'var(--colors-gray-600)',
        700: 'var(--colors-gray-700)',
        800: 'var(--colors-gray-800)',
        900: 'var(--colors-gray-900)',
      },
    },
    outlineWidth: {
      default: '1px',
      0: '0',
      md: '2px',
      lg: '4px',
    },
    extend: {
      width: {
        11: '2.75rem',
      },
    },
  },
  variants: {
    outline: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fill: ['responsive', 'hover'],
  },
  plugins: [],
  corePlugins: {
    float: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
