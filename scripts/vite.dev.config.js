require('dotenv').config({ path: `.env.development` });

const common = require('./vite.common')
module.exports = {
  ...common,
  build: {
    ...common.build,
    minify: false,
    sourcemap: true,
  }
};
