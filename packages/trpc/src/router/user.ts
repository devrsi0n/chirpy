import { z } from 'zod';

import { prisma } from '../common/db';
import { router, protectedProcedure } from '../trpc-server';

export const userRouter = router({
  me: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const me = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
      return me;
    }),
});
