import { parseSubdomain } from '@chirpy-dev/utils';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest } from 'next/server';

export type ParsedUrl = {
  url: NextURL;
  /**
   * Get hostname of request (e.g. chirpy.dev, demo.localhost:3000)
   */
  hostname: string;
  /**
   * Subdomain or custom domain of request (e.g. chirpy, demo, exmaple.com)
   */
  currentHost: string;
};

export function parseMiddlewareUrl(req: NextRequest): ParsedUrl {
  const url = req.nextUrl;

  // Get hostname of request (e.g. chirpy.dev, demo.localhost:3000)
  const hostname = req.headers.get('host') || 'chirpy.dev';

  const currentHost = parseSubdomain(hostname) || hostname;
  return { url, hostname, currentHost };
}
