import { AUTH_COOKIE_NAME } from '$/server/common/constants';
import { getAuthCookies } from '$/server/common/cookie';
import { SessionRequest } from '$/server/types/session';
import { createToken } from '$/server/utilities/create-token';

import { sessionMiddleware } from '../session';

describe('telemetry middleware', () => {
  it('should mount session to the req', async () => {
    const payload = {
      sub: 'user.id',
    };
    const req: SessionRequest = {
      headers: {
        cookie: getAuthCookies(createToken(payload, { maxAge: 10_000 }), 10_000),
      },
    } as SessionRequest;
    const res: any = {};
    const next = jest.fn();
    await sessionMiddleware({ name: AUTH_COOKIE_NAME })(req, res, next);
    expect(req.session).toMatchObject(payload);
  });
});
