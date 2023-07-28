import { router } from '../server';
import { emailRouter } from './email';

export const edgeRouter = router({
  email: emailRouter,
});
export type EdgeRouter = typeof edgeRouter;
