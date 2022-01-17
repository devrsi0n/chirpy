const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const babel = require('../.babelrc');

module.exports = {
  stories: [
    // '../stories/**/*.stories.mdx',
    '../src/**/*.stories.mdx',
    // '../stories/**/*.stories.@(ts|tsx)',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  webpackFinal: (config) => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    );
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    return config;
  },
  babel: (options) => ({
    ...options,
    ...babel,
  }),
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
};
