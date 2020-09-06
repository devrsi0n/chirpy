import connect from 'next-connect';
import { passport } from '@server/passport';

const handler = connect();

handler.use(
  passport.initialize(),
  passport.authenticate('github', {
    scope: ['email', 'user:profile'],
  }),
);

export default handler;
