// const defaultTheme = require('tailwindcss/defaultTheme');

const isEnvProd = process.env.NODE_ENV === 'production';

module.exports = {
  darkMode: 'class',
  purge: isEnvProd ? ['./src/**/*.tsx'] : [],
  theme: {
    extend: {
      colors: {
        // transparent: 'transparent',
        // current: 'currentColor',
        // black: '#000',
        // white: '#fff',
  
        primary: {
          light: 'var(--colors-primary-light)',
          DEFAULT: 'var(--colors-primary)',
          dark: 'var(--colors-primary-dark)',
        },
        // Secondary, Blue, Used for accents & actions.
        secondary: {
          light: 'var(--colors-secondary-light)',
          DEFAULT: 'var(--colors-secondary)',
          dark: 'var(--colors-secondary-dark)',
        },
        // Error, red, Used for error states.
        error: {
          light: 'var(--colors-error-light)',
          DEFAULT: 'var(--colors-error)',
          dark: 'var(--colors-error-dark)',
        },
        // Green, Used for success states.
        success: {
          light: 'var(--colors-success-light)',
          DEFAULT: 'var(--colors-success)',
          dark: 'var(--colors-success-dark)',
        },
        // yellow, Used to represent caution.
        warn: {
          light: 'var(--colors-warn-light)',
          DEFAULT: 'var(--colors-warn)',
          dark: 'var(--colors-warn-dark)',
        },
        text: {
          DEFAULT: 'var(--colors-text)',
          inverse: 'var(--colors-text-inverse)',
          active: 'var(--colors-text-active)',
          placeholder: 'var(--colors-text-placeholder)',
          light: 'var(--colors-text-light)',
        },
        background: {
          DEFAULT: 'var(--colors-background)',
          secondary: 'var(--colors-background-secondary)',
          inverse: 'var(--colors-background-inverse)',
        },
        divider: 'var(--colors-divider)',
        borderColor: {
          DEFAULT: 'var(--colors-divider)',
        },
        fill: {
          current: 'currentColor',
          DEFAULT: 'var(--colors-text)',
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
        DEFAULT: '1px',
        0: '0',
        md: '2px',
        lg: '4px',
      },
    },
  },
  variants: {
    outline: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fill: ['responsive', 'hover'],
    extend: {
      borderWidth: ['hover', 'focus'],
    }
  },
  plugins: [],
  corePlugins: {
    float: false,
  },
};
