import { PrismaClient, Prisma } from '@prisma/client';

const options: Prisma.PrismaClientOptions = {
  log:
    process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
};

let cachePrisma: PrismaClient | null = null;

export const prisma: PrismaClient = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient(options);
  } else {
    if (!cachePrisma) {
      cachePrisma = new PrismaClient(options);
    }
    return cachePrisma;
  }
})();

export interface Context {
  prisma: PrismaClient;
}

export function createContext(): Context {
  return { prisma };
}
