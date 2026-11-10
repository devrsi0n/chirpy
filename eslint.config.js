const config = require('@chirpy-dev/eslint-config');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/generated/**',
      '**/.next/**',
      '**/public/**',
      '**/dist/**',
      'packages/sdk/lib/**',
      '**/out/**',
      '**/.turbo/**',
      '**/storybook-static/**',
      '**/*.js',
    ],
  },
  ...config,
];
