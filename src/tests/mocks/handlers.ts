import { rest } from 'msw';

const MOCK_CACHE = 'mock cache';

export const handlers = [
  rest.post('/api/event', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cache: MOCK_CACHE,
      }),
    );
  }),
];
