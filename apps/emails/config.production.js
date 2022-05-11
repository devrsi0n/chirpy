/*
|-------------------------------------------------------------------------------
| Production config           https://maizzle.com/docs/environments/#production
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/
const path = require('path');

module.exports = {
  build: {
    templates: {
      destination: {
        path: path.resolve(__dirname, '../main/src/server/services/email/templates'),
      },
    },
  },
  inlineCSS: true,
  removeUnusedCSS: true,
};
