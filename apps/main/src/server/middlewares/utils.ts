import { parseSubdomain } from '@chirpy-dev/utils';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest } from 'next/server';

export type ParsedUrl = {
  url: NextURL;
  /**
   * Get host of request (e.g. chirpy.dev, demo.localhost:3000)
   */
  host: string;
  /**
   * Subdomain or custom domain of request (e.g. chirpy, demo, exmaple.com)
   */
  currentHost: string;
};

export function parseMiddlewareUrl(req: NextRequest): ParsedUrl {
  const url = req.nextUrl;

  // Get host of request (e.g. chirpy.dev, demo.localhost:3000)
  const host = req.headers.get('host') || 'chirpy.dev';

  const currentHost = parseSubdomain(host) || host;
  return { url, host, currentHost };
}
