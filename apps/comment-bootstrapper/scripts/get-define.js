const dotenv = require('dotenv');
const path = require('path');

function getDefine() {
  // Load local .env file, fine if it doesn't exist
  dotenv.config({ path: path.resolve(__dirname, `../../main/.env.local`) });

  return {
    'process.env.NEXT_PUBLIC_HOME_ORIGIN': JSON.stringify(
      process.env.NEXT_PUBLIC_HOME_ORIGIN,
    ),
    'process.env.NODE_ENV': JSON.stringify(
      process.env.VITE_DEBUG ? 'development' : 'production',
    ),
  };
}

module.exports = { getDefine };
