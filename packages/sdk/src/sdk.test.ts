import 'dotenv/config';

import { ChirpySDK } from './sdk';

async function test() {
  const sdk = new ChirpySDK(
    process.env.CHIRPY_SDK_KEY!,
    'http://localhost:3000',
  );
  const page = await sdk.getPage('http://localhost:3000/play');
  console.log(page);
  const user = await sdk.createUser('pickle@mac.com', 'Pickle');
  console.log(user);
  await sdk.linkPageAuthor('http://localhost:3000/play', user.id);
}

test();
