//eslint-disable-next-line @typescript-eslint/no-var-requires
const { ESLint } = require('eslint');

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(
    files.map((file) => eslint.isPathIgnored(file)),
  );
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '*.{json,md,scss,js}': ['prettier --write'],
  '*.{ts,tsx}': async (filenames) => {
    const filesToLint = await removeIgnoredFiles(filenames);
    const prettierSortImportsConfigPath = require.resolve(
      '@chirpy-dev/prettier-config/sort-imports.config',
    );
    return [
      // We run @trivago/prettier-plugin-sort-imports before prettier-plugin-tailwindcss (included in eslint)
      // because @trivago/prettier-plugin-sort-imports conflicts with prettier-plugin-tailwindcss.
      `prettier --config ${prettierSortImportsConfigPath} --write ${filesToLint}`,
      `eslint --fix --max-warnings=0 ${filesToLint}`,
    ];
  },
};
