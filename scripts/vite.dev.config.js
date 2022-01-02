require('dotenv').config({ path: `.env.local` });

const common = require('./vite.common')
module.exports = {
  ...common,
  build: {
    ...common.build,
    lib: {
      ...common.build.lib,
      fileName: () => 'comment-dev.js',
    },
    minify: false,
    sourcemap: true,
  }
};
