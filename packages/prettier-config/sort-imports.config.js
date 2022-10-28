const commonConfig = require('./common.config');

// `@trivago/prettier-plugin-sort-imports` conflicts with `prettier-plugin-tailwindcss`,
// we can only run 1 of them per time.
module.exports = {
  ...commonConfig,
  plugins: [require('@ianvs/prettier-plugin-sort-imports')],
  importOrder: ['^[../]', '^[./]'],
  importOrderSeparation: true,
};
