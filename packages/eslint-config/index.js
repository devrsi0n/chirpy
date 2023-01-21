const path = require('path');

module.exports = {
  plugins: ['@typescript-eslint', 'prettier', 'unicorn', 'jest'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  settings: {
    next: {
      rootDir: [path.resolve(__dirname, '../../apps/main/')],
    },
  },
  rules: {
    'no-console': 'off',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    'prettier/prettier': ['warn', require('../prettier-config')],

    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': ['error', 'apps/main/src/pages/'],

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [/^\[.+]\.tsx?$/],
      },
    ],
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/import-style': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-json-parse-buffer': 'off',
    'unicorn/prefer-top-level-await': 'off',

    'jest/expect-expect': 'off',
    'jest/no-disabled-tests': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/display-name': 'off',
        'unicorn/prefer-event-target': 'off',
      },
    },
  ],
};
