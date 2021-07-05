import { rest } from 'msw';

export const MOCK_CACHE = 'mock cache';
export const MOCK_PAGE_ID = 'mock-page-id';

export const handlers = [
  rest.post('/api/event', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cache: MOCK_CACHE,
      }),
    );
  }),
  rest.get('/api/page', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: MOCK_PAGE_ID,
      }),
    );
  }),
];
