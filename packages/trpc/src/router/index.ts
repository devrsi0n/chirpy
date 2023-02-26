import { tRouter } from '../trpc-server';
import { analyticsRouter } from './analytics';
import { commandRouter } from './command';
import { commentRouter } from './comment';
import { likeRouter } from './like';
import { notificationRouter } from './notification';
import { projectRouter } from './project';
import { revalidateRouter } from './revalidate';
import { siteRouter } from './site';
import { userRouter } from './user';

export const appRouter = tRouter({
  user: userRouter,
  notification: notificationRouter,
  project: projectRouter,
  comment: commentRouter,
  like: likeRouter,
  revalidate: revalidateRouter,
  site: siteRouter,
  analytics: analyticsRouter,
  command: commandRouter,
});

export type AppRouter = typeof appRouter;
export { getRecordMapByUrl, getNotionId } from './site/utils';
export { getAllSitesUsage } from './analytics';
