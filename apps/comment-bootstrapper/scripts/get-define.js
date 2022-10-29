const dotenv = require('dotenv');
const path = require('path');

function getDefine() {
  // Load local .env file, fine if it doesn't exist
  dotenv.config({ path: path.resolve(__dirname, `../../main/.env.local`) });

  return {
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(
      process.env.NEXT_PUBLIC_APP_URL,
    ),
  };
}

module.exports = { getDefine };
