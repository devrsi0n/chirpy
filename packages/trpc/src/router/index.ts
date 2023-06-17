import { router } from '../trpc-server';
import { analyticsRouter } from './analytics/analytics';
import { commentRouter } from './comment';
import { likeRouter } from './like';
import { notificationRouter } from './notification';
import { projectRouter } from './project';
import { revalidateRouter } from './revalidate';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  notification: notificationRouter,
  project: projectRouter,
  comment: commentRouter,
  like: likeRouter,
  revalidate: revalidateRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
