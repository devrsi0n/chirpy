import { PrismaClient, Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

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

export type Context = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
};

export function createContext(req: NextApiRequest, res: NextApiResponse): Context {
  return { prisma, req, res };
}
