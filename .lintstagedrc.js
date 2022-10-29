module.exports = {
  '*.{json,md,scss,js}': ['prettier --write'],
  '**/generated/**/*.{ts,tsx}': ['prettier --write'],
  '*.graphql': ['prettier --write', 'cd packages/graphql && pnpm run build'],
  '*.{ts,tsx}': (filenames) => {
    const prettierSortImportsConfigPath = require.resolve(
      '@chirpy-dev/prettier-config/sort-imports.config',
    );
    return [
      // We run @trivago/prettier-plugin-sort-imports before prettier-plugin-tailwindcss (included in eslint)
      // because @trivago/prettier-plugin-sort-imports conflicts with prettier-plugin-tailwindcss.
      `prettier --config ${prettierSortImportsConfigPath} --write ${filenames.join(
        ' ',
      )}`,
      `eslint --fix ${filenames.join(' ')}`,
    ];
  },
};
