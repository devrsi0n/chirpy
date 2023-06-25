import { build } from 'vite';
import { resolve } from 'path';
import { getDefine } from './get-define.mjs';
import * as url from 'url';
// import dts from 'vite-plugin-dts'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

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

const publicPath = resolve(__dirname, '../../main/public');

/**
 * @type {import('vite').InlineConfig}
 */
const publicConfig = {
  build: {
    watch: !!process.env.VITE_DEBUG,
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: 'bootstrapper',
      fileName: () => 'bootstrapper.js',
      formats: ['umd'],
    },
    outDir: publicPath,
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
      entry: resolve(__dirname, '../src/lib/index.ts'),
      name: 'comment',
      fileName: () => 'index.js',
      formats: ['es', 'cjs'],
    },
    outDir: resolve(__dirname, '../dist'),
    ...commonBuildConfig,
  },
  ...commonConfig,
  // TODO: build TS definition files
  // plugins: [dts()],
};

(async function buildBootstrapper() {
  await Promise.all([build(publicConfig), build(libConfig)]);
})();
