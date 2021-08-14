const defaultTheme = require('tailwindcss/defaultTheme');
const { lightBlue, ...colors } = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // gray: colors.trueGray,
        primary: {
          50: 'var(--tw-colors-primary-50)',
          100: 'var(--tw-colors-primary-100)',
          200: 'var(--tw-colors-primary-200)',
          300: 'var(--tw-colors-primary-300)',
          400: 'var(--tw-colors-primary-400)',
          500: 'var(--tw-colors-primary-500)',
          600: 'var(--tw-colors-primary-600)',
          700: 'var(--tw-colors-primary-700)',
          800: 'var(--tw-colors-primary-800)',
          900: 'var(--tw-colors-primary-900)',
        },
        bg: 'hsl(210, 10%, 98%)'
      },
      fill: colors,
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
        fit: 'fit-width'
      }
    },
    // typography: (theme) => ({
    //   light: {
    //     css: [
    //       {
    //         color: theme('colors.gray.400'),
    //         '[class~="lead"]': {
    //           color: theme('colors.gray.300'),
    //         },
    //         a: {
    //           color: theme('colors.white'),
    //         },
    //         strong: {
    //           color: theme('colors.white'),
    //         },
    //         'ol > li::before': {
    //           color: theme('colors.gray.400'),
    //         },
    //         'ul > li::before': {
    //           backgroundColor: theme('colors.gray.600'),
    //         },
    //         hr: {
    //           borderColor: theme('colors.gray.200'),
    //         },
    //         blockquote: {
    //           color: theme('colors.gray.200'),
    //           borderLeftColor: theme('colors.gray.600'),
    //         },
    //         h1: {
    //           color: theme('colors.white'),
    //         },
    //         h2: {
    //           color: theme('colors.white'),
    //         },
    //         h3: {
    //           color: theme('colors.white'),
    //         },
    //         h4: {
    //           color: theme('colors.white'),
    //         },
    //         'figure figcaption': {
    //           color: theme('colors.gray.400'),
    //         },
    //         code: {
    //           color: theme('colors.white'),
    //         },
    //         'a code': {
    //           color: theme('colors.white'),
    //         },
    //         pre: {
    //           color: theme('colors.gray.200'),
    //           backgroundColor: theme('colors.gray.800'),
    //         },
    //         thead: {
    //           color: theme('colors.white'),
    //           borderBottomColor: theme('colors.gray.400'),
    //         },
    //         'tbody tr': {
    //           borderBottomColor: theme('colors.gray.600'),
    //         },
    //       },
    //     ],
    //   },
    // }),
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
