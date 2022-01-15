require('dotenv').config({ path: `.env.local` });

const common = require('./vite.common');
module.exports = {
  ...common,
  build: {
    ...common.build,
    minify: false,
    sourcemap: true,
  },
};
