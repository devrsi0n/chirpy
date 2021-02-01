import { PrismaClient, Prisma } from '@prisma/client';

const options: Prisma.PrismaClientOptions = {
  log:
    process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
};

export const prisma: PrismaClient = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient(options);
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient(options);
    }
    return global.prisma;
  }
})();

export interface Context {
  prisma: PrismaClient;
}

export function createContext(): Context {
  return { prisma };
}
