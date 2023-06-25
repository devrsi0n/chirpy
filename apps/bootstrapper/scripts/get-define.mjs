import { config } from 'dotenv';
import { resolve } from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export function getDefine() {
  // Load local .env file, fine if it doesn't exist
  config({ path: resolve(__dirname, `../../main/.env.local`) });

  return {
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(
      process.env.NEXT_PUBLIC_APP_URL,
    ),
  };
}
