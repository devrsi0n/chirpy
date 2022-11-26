import { PrismaClient } from '@prisma/client';

export type { Page, Project, User, NotificationMessage } from '@prisma/client';

// Save it to global, but don't declare it since we may misuse it
export const prisma: PrismaClient =
  // @ts-ignore
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma;
}
