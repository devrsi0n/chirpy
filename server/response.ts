import { ServerResponse } from 'http';

export function redirect(res: ServerResponse, url: string): void {
  res.writeHead(302, { Location: url });
  res.end();
}
