import { rest } from 'msw';

export const MOCK_CACHE = 'mock cache';
export const MOCK_PAGE_ID = 'mock-page-id';

export const mockLogout = jest.fn();

afterEach(() => {
  mockLogout.mockReset();
});

export const restHandlers = [
  rest.get('*/api/page', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: MOCK_PAGE_ID,
      }),
    );
  }),
  rest.get('*/api/auth/logout', (req, res, ctx) => {
    const result = mockLogout();
    if (result) {
      return res(ctx.status(200), ctx.json(result));
    }
    return res(
      ctx.status(200),
      ctx.json({
        id: MOCK_PAGE_ID,
      }),
    );
  }),
  rest.get('*/api/auth/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        expires: '2099-12-31T23:59:59.999Z',
        hasuraToken: 'radom-token-skjadfhnkj',
        user: {
          id: 'user-id',
          name: 'session user name',
          email: 'test@session.com',
          image: 'https://image.test',
        },
      }),
    );
  }),
  rest.get('*/api/stats/*/main-graph', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        interval: 'date',
        labels: ['2022-01-02'],
        plot: [2],
        present_index: 30,
        sample_percent: 100,
        top_stats: [
          { change: 100, name: 'Unique visitors', value: 62 },
          { change: 100, name: 'Total pageviews', value: 212 },
          { change: null, name: 'Bounce rate', value: 66 },
          { change: 100, name: 'Visit duration', value: 356 },
        ],
      }),
    );
  }),
];
