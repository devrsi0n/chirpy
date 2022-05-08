const path = require('path');

module.exports = {
  ...require('../main/tailwind.config'),
  content: [
    path.resolve(__dirname, '../main/**/*.{ts,tsx}'),
    path.resolve(__dirname, './.storybook/**/*.{js}'),
  ],
};
