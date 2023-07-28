import { edgeRouter, fetchRequestHandler } from '@chirpy-dev/trpc';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// export API handler
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: edgeRouter,
    req,
    createContext: () => ({}),
  });
}
