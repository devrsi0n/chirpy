import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware: typeof cors) {
  return (
    req: NextApiRequest,
    res: NextApiResponse,
    options?: CorsOptions | CorsOptionsDelegate,
  ) =>
    new Promise((resolve, reject) => {
      middleware(options)(req, res, (result: Error | unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }

        return resolve(result);
      });
    });
}

export const nextCors = initMiddleware(cors);
