const path = require('path');

module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports'),
  ],
  tailwindConfig: path.resolve(__dirname, '../../apps/main/tailwind.config.js'),
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  endOfLine: 'lf',
  importOrder: ['^\\$/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
