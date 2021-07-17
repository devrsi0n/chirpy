import { sessionMiddleware } from '../middlewares/session';
import { passport } from '../services/passport';
import { apiHandler } from './api-handler';
import { AUTH_COOKIE_NAME } from './constants';

export const authHandler = apiHandler
  .use(sessionMiddleware({ name: AUTH_COOKIE_NAME }))
  .use(passport.initialize())
  .use(passport.session());
