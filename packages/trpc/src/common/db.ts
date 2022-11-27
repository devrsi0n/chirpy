import { PrismaClient } from '@prisma/client';

export type {
  Page,
  Project,
  User,
  Team,
  Member,
  Comment,
  Like,
  NotificationMessage,
  NotificationSubscription,
} from '@prisma/client';

// Save it to global, but don't declare it since we use it without import
export const prisma: PrismaClient =
  // @ts-ignore
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? // ? ['query', 'error', 'warn']
          ['error', 'warn']
        : ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma;
}
