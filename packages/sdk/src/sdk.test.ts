import 'dotenv/config';

import { ChirpySDK } from './sdk';

async function test() {
  const sdk = new ChirpySDK(
    process.env.CHIRPY_SDK_KEY!,
    'http://localhost:3000',
  );
  const proj = await sdk.getProject('chirpy.dev');
  console.log(proj);
}

test();
