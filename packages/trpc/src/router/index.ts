import { router } from '../trpc-server';
import { commentRouter } from './comment';
import { notificationRouter } from './notification';
import { projectRouter } from './project';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  notification: notificationRouter,
  project: projectRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
