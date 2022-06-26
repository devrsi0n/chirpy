import { NextApiResponse } from 'next';

export function redirect(res: NextApiResponse, url: string): void {
  res.writeHead(302, { Location: url });
  res.end();
}

export function unauthorized(
  res: NextApiResponse,
  message = 'Unauthorized',
): void {
  res.status(401).json({ message });
  res.end();
}

export function badRequest(
  res: NextApiResponse,
  message = 'Bad Request',
): void {
  res.status(400).json({ message });
  res.end();
}
