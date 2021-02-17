// const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: {
    content: ['./src/**/*.tsx'],
    enabled: process.env.NODE_ENV === 'production',
  },
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
      screens: {
        xs: '375px',
      },
      outlineWidth: {
        DEFAULT: '1px',
        0: '0',
        md: '2px',
        lg: '4px',
      },
    },
    typography: (theme) => ({
      light: {
        css: [
          {
            color: theme('colors.gray.400'),
            '[class~="lead"]': {
              color: theme('colors.gray.300'),
            },
            a: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
            },
            blockquote: {
              color: theme('colors.gray.200'),
              borderLeftColor: theme('colors.gray.600'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.white'),
            },
            'a code': {
              color: theme('colors.white'),
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            thead: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.gray.400'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.600'),
            },
          },
        ],
      },
    }),
  },
  variants: {
    outline: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'dark'],
    fill: ['responsive', 'hover'],
    extend: {
      borderWidth: ['hover', 'focus'],
      typography: ['dark'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    float: false,
  },
};
