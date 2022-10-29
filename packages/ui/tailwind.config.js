/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('configs').tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    './node_modules/@chirpy-dev/ui/src/**/*.{ts,tsx}',
  ],
};
