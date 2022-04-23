module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'prettier', 'unicorn', '@emotion', 'jest'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    'prettier/prettier': 'warn',

    '@next/next/no-img-element': 'off',

    // '@emotion/jsx-import': 'error',
    '@emotion/pkg-renaming': 'error',

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [/^\[.+\]\.tsx?$/],
      },
    ],

    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicore/prefer-module': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prefer-json-parse-buffer': 'off',

    'jest/expect-expect': 'off',
  },
};
