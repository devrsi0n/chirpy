const defaultTheme = require('tailwindcss/defaultTheme');

const isEnvProd = process.env.NODE_ENV === 'production';

module.exports = {
  purge: isEnvProd ? ['./src/**/*.tsx'] : [],
  theme: {
    colors: {
      ...defaultTheme.colors,
      primary: {
        light: 'var(--colors-primary-light)',
        default: 'var(--colors-primary)',
        dark: 'var(--colors-primary-dark)',
      },
      text: {
        default: 'var(--colors-text)',
        inverse: 'var(--colors-text-inverse)',
        secondary: 'var(--colors-text-secondary)',
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
        11: '2.75rem'
      }
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
