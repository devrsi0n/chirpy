const { build } = require('vite');
const path = require('path');
const { getDefine } = require('./get-define');

const commonBuildConfig = {
  ...(process.env.VITE_DEBUG && {
    minify: false,
    sourcemap: true,
  }),
};

/**
 * @type {import('vite').UserConfig}
 */
const publicConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      name: 'comment',
      fileName: () => 'comment.js',
      formats: ['umd'],
    },
    outDir: path.resolve(__dirname, '../../main/public/bootstrap'),
    ...commonBuildConfig,
  },
  define: getDefine(),
};

/**
 * @type {import('vite').UserConfig}
 */
const libConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/lib/index.ts'),
      name: 'comment',
      fileName: () => 'index.js',
      formats: ['commonjs'],
    },
    outDir: path.resolve(__dirname, '../dist'),
    ...commonBuildConfig,
  },
  define: getDefine(),
};

(async function buildComment() {
  await Promise.all([build(publicConfig), build(libConfig)]);
})();
