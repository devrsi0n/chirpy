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
  plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
  env: {
    test: {
      presets: [
        [
          'next/babel',
          {
            'preset-env': {
              targets: {
                node: 'current',
              },
            },
            'transform-runtime': {
              absoluteRuntime: false,
              corejs: false,
              helpers: false,
              regenerator: false,
            },
            'styled-jsx': {},
            'class-properties': {},
          },
        ],
      ],
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
