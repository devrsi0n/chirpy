const path = require('path');
const commonConfig = require('./common.config');

module.exports = {
  ...commonConfig,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: path.resolve(__dirname, '../../apps/main/tailwind.config.js'),
};
