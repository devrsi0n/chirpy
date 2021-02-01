/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface Global {
    prisma: PrismaClient;
  }
}
