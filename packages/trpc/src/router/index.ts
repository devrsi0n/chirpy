import { router } from '../trpc-server';
import { authRouter } from './auth';
import { notificationRouter } from './notification';
import { projectRouter } from './project';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  notification: notificationRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
