import { NextApiRequest } from 'next';

export function getFirstQueryParam(query: NextApiRequest['query'], key: string): string {
  let param = query[key];
  if (Array.isArray(param)) {
    param = param[0];
  }
  return param;
}
