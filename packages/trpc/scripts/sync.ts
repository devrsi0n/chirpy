import 'dotenv/config';

import { prisma as pg } from '@chirpy-dev/db';

import { prisma as ps } from '../src/common/db-client';

async function main() {
  const tokens = await ps.verificationToken.findMany();
  console.log('token count', tokens.length);
  await pg.verificationToken.createMany({
    data: tokens,
    skipDuplicates: true,
  });
}

main();
