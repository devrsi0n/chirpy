const twColors = require('tailwindcss/colors');
const colors = {
  primary: twColors.violet[500],
  primaryDark: twColors.violet[700],
  primaryLight: twColors.violet[200],
  secondary: '#25283D',
  secondaryLight: '#A5A7B4',
  success: '#1FCC83',
  warning: '#FFFDE9',
  error: '#F76363',
  body: '#f6f7f9',
  'neutral-01': '#fff',
  'neutral-04': '#fdfdfe',
  'neutral-08': '#f4f4f7',
  'neutral-12': '#e8e9ed',
  'neutral-24': '#CBCCD1',
  'neutral-64': '#636679',
};

const typography = {
  fontFamily: 'Inter var',
};

module.exports = { colors, typography };
