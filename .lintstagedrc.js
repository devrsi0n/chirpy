module.exports = {
  '*.{json,md,scss,js}': ['prettier --write'],
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
      `eslint --fix --max-warnings=0 ${filenames.join(' ')}`,
    ];
  },
};
