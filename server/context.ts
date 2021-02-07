import { PrismaClient, Prisma } from '@prisma/client';

import { isENVDev } from './utilities/env';

const options: Prisma.PrismaClientOptions = {
  log: isENVDev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
};

export const prisma: PrismaClient = (() => {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options);
  }
  return global.prisma;
})();

export interface Context {
  prisma: PrismaClient;
}

export function createContext(): Context {
  return { prisma };
}
