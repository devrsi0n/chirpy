module.exports = {
  root: true,
  plugins: ['prettier', 'unicorn', '@emotion', 'jest'],
  extends: [
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'warn',

    '@next/next/no-img-element': 'off',
    '@next/next/inline-script-id': 'off',

    // '@emotion/jsx-import': 'error',
    '@emotion/pkg-renaming': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicore/prefer-module': 'off',
    'unicorn/no-array-for-each': 'off',

    'jest/expect-expect': 'off',
  },
};
