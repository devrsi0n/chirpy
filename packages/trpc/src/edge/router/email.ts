import Email from 'vercel-email';
import { z } from 'zod';

import { publicProcedure, router } from '../../trpc-server';

export const CONTACK_INPUT = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export const SEND_EMAIL_INPUT = z.object({
  token: z.string(),
  to: CONTACK_INPUT,
  subject: z.string(),
  html: z.string().optional(),
  text: z.string().optional(),
});

export const emailRouter = router({
  send: publicProcedure.input(SEND_EMAIL_INPUT).query(async ({ input }) => {
    await Email.send({
      ...input,
      from: {
        email: 'notification@chirpy.dev',
        name: 'Chirpy',
      },
    });
  }),
});
