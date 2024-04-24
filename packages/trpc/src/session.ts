import { WIDGET_HEADER } from '@chirpy-dev/utils';
import type { NextApiRequest } from 'next';
import type { Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { getNextAuthOptions } from './auth/auth-options';

export function isWidgetRequest(req: NextApiRequest) {
  return req.headers[WIDGET_HEADER.toLowerCase()] === 'true';
}

/**
 * Used by widget/iframe, nextauth can't handle auth via http header
 */
export async function getWidgetSession(
  req: NextApiRequest,
): Promise<Session | null> {
  if (!isWidgetRequest(req)) {
    return null;
  }
  const options = getNextAuthOptions(req);
  // getToken supports cookie and http header `authorization`
  const token = await getToken({
    req,
  });
  if (!token) {
    return null;
  }
  const session = await options.callbacks?.session?.({
    token,
    // @ts-expect-error
    session: {},
  });
  return session as Session | null;
}
