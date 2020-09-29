const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    colors: {
      ...defaultTheme.colors,
      primary: defaultTheme.colors.blue[500],
      secondary: defaultTheme.colors.purple[400],
    },
    backgroundColor: (theme) => ({
      primary: theme('colors.blue.500'),
      secondary: theme('colors.purple.400'),
    }),
  },
  variants: {
    outline: ['responsive', 'hover', 'focus'],
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
