import { CookieSerializeOptions, serialize } from 'cookie';

import { isENVProd } from '../utilities/env';
import { AUTH_COOKIE_NAME } from './constants';

const getCookieOptions = (maxAge: number, httpOnly = false): CookieSerializeOptions => ({
  path: '/',
  httpOnly,
  sameSite: 'lax',
  secure: isENVProd,
  maxAge,
});

export const getAuthCookies = (authToken: string, maxAge: number) =>
  serialize(AUTH_COOKIE_NAME, authToken, getCookieOptions(maxAge));
