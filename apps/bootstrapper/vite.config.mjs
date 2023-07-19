import { defineConfig } from 'vite';

import { getDefine } from './scripts/get-define.mjs';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';

  if (!isServe) {
    throw new Error(
      'Only run serve command in default vite config, check scripts/build.js for build process',
    );
  }
  return {
    root: './',
    server: {
      hmr: {
        host: 'localhost',
      },
      port: 3001,
    },
    define: getDefine(),
  };
});
