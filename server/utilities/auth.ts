import { parse } from 'cookie';
import { NextApiRequest } from 'next';

import { AUTH_COOKIE_NAME } from '$shared/constants';

import { parseToken } from './token';

export type AuthUser = {
  sub: string;
  name: string;
  email: string;
};

export async function getUserId(req: NextApiRequest): Promise<string> {
  const token = parse(req.headers.cookie || '')[AUTH_COOKIE_NAME];
  if (!token) {
    throw new Error(`Authentication Error`);
  }

  const authUser = parseToken(token) as AuthUser;

  if (!authUser) {
    throw new Error(`Authentication Error`);
  }

  return authUser.sub;
}
