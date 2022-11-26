import { router } from '../trpc-server';
import { commentRouter } from './comment';
import { likeRouter } from './like';
import { notificationRouter } from './notification';
import { projectRouter } from './project';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  notification: notificationRouter,
  project: projectRouter,
  comment: commentRouter,
  like: likeRouter,
});

export type AppRouter = typeof appRouter;
