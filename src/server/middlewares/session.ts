import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { AuthUser, SessionRequest } from '../types/session';
import { parseToken } from '../utilities/token';

export type SessionOptions = {
  name: string;
};

export function sessionMiddleware({ name }: SessionOptions) {
  return async (req: SessionRequest, res: NextApiResponse, next: NextHandler) => {
    const cookies = parseCookies(req);
    const token = cookies[name];
    let authUser: AuthUser = {} as AuthUser;

    if (token) {
      try {
        authUser = parseToken(token) as AuthUser;
      } catch (error: any) {
        console.error(`Parse token failed ${error}, token: ${token}`);
      }
    }

    req.session = authUser;

    next();
  };
}

function parseCookies(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}
