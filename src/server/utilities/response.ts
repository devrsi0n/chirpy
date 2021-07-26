import { NextApiResponse } from 'next';

export function redirect(res: NextApiResponse, url: string): void {
  res.writeHead(302, { Location: url });
  res.end();
}
