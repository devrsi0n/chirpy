const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  stories: ['../../main/src/**/*.stories.mdx', '../../main/src/**/*.stories.@(ts|tsx)'],
  webpackFinal: (config) => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../../main/tsconfig.json'),
      }),
    );
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    return config;
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../../main/next.config.js')
      }
    },
    '@storybook/addon-interactions',
  ],
  actions: { argTypesRegex: '^on.*' },
};
