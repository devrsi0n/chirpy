const { build } = require('vite');
const path = require('path');
const { getDefine } = require('./get-define');

/**
 * @type {import('vite').InlineConfig}
 */
const commonConfig = {
  configFile: false,
  define: getDefine(),
};

const commonBuildConfig = {
  ...(process.env.VITE_DEBUG && {
    minify: false,
    sourcemap: true,
  }),
};

/**
 * @type {import('vite').InlineConfig}
 */
const publicConfig = {
  build: {
    watch: !!process.env.VITE_DEBUG,
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      name: 'comment',
      fileName: () => 'comment.js',
      formats: ['umd'],
    },
    outDir: path.resolve(__dirname, '../../main/public/bootstrap'),
    ...commonBuildConfig,
  },
  ...commonConfig,
};

/**
 * @type {import('vite').InlineConfig}
 */
const libConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/lib/index.ts'),
      name: 'comment',
      fileName: () => 'index.js',
      formats: ['cjs'],
    },
    outDir: path.resolve(__dirname, '../dist'),
    ...commonBuildConfig,
  },
  ...commonConfig,
};

(async function buildComment() {
  await Promise.all([build(publicConfig), build(libConfig)]);
})();
