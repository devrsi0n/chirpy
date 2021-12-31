require('dotenv').config({ path: `.env` });
require('dotenv').config({ path: `.env.development` });

module.exports = {
  root: 'src/external',
  server: {
    hmr: {
      host: 'localhost',
    },
    port: 3001,
  },
  define: {
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(process.env.NEXT_PUBLIC_APP_URL),
  },
};
