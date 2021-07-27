module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin', 'babel-plugin-preval', 'babel-plugin-macros'],
  env: {
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
