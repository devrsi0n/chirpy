const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('@chirpy-dev/configs').tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}',
    "./stories/**/*.{js,ts,jsx,tsx}",
    // path.join(__dirname, './src/**/*.{ts,tsx}'),
    // path.join(__dirname, "./stories/**/*.{js,ts,jsx,tsx}"),
  ],
};
