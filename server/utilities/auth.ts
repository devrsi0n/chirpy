import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

import { AUTH_COOKIE_NAME } from '$shared/constants';

export type AuthUser = {
  sub: string;
  name: string;
  email: string;
};

function verifyToken(token: string) {
  const decodedToken = jwt.verify(token, process.env.HASH_KEY, {
    algorithms: ['HS256'],
  });
  return decodedToken as AuthUser;
}

export async function getUserId(req: NextApiRequest): Promise<string> {
  const token = parse(req.headers.cookie || '')[AUTH_COOKIE_NAME];
  if (!token) {
    throw new Error(`Authentication Error`);
  }

  const authUser = verifyToken(token);

  if (!authUser) {
    throw new Error(`Authentication Error`);
  }

  return authUser.sub;
}
