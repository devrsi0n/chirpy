const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    colors: {
      ...defaultTheme.colors,
      'primary-light': 'var(--colors-primary-light)',
      primary: 'var(--colors-primary)',
      'primary-dark': 'var(--colors-primary-dark)',
      'text-light': 'var(--colors-text-light)',
      text: 'var(--colors-text)',
      'text-dark': 'var(--colors-text-dark)',
      background: 'var(--colors-background)',
    },
  },
  variants: {
    outline: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
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
