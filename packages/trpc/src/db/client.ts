import { isENVDev } from '@chirpy-dev/utils';
import { PrismaClient } from '@prisma/client';
import { log } from 'next-axiom';
import SuperJSON from 'superjson';

export { Prisma } from '@prisma/client';
declare global {
  // eslint-disable-next-line no-var
  var _prismaClient: ReturnType<typeof getPrismaClient> | undefined;
}

function getPrismaClient() {
  return new PrismaClient({
    log: isENVDev
      ? ['error', 'warn']
      : [
          {
            emit: 'event',
            level: 'error',
          },
          {
            emit: 'event',
            level: 'warn',
          },
        ],
  });
}

export const prisma = global._prismaClient || getPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global._prismaClient = prisma;
}
if (!isENVDev) {
  prisma.$on('error', (e) => {
    log.error(`Prisma error: ${SuperJSON.stringify(e)}`);
  });

  prisma.$on('warn', (e) => {
    log.warn(`Prisma warn: ${SuperJSON.stringify(e)}`);
  });
}
