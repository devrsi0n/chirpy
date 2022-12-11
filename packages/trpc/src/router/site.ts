import { z } from 'zod';

import { prisma } from '../common/db-client';
import { protectedProcedure, router } from '../trpc-server';

export const siteRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        subdomain: z.string(),
        description: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const result = await prisma.site.create({
        data: {
          ...input,
          managerId: ctx.session.user.id,
        },
      });
      return result;
    }),
});
