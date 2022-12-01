import { rest } from 'msw';

import { mockNotificationMessages } from '../../../blocks/notification-hub/stories/mock-data';
import { mockProject } from '../../mocks/mock-project-data';

export const MOCK_CACHE = 'mock cache';
export const MOCK_PAGE_ID = 'mock-page-id';

export const mockLogout = jest.fn();

export const mockDeleteNotification = jest.fn().mockReturnValue({});
export const mockReadNotification = jest.fn().mockReturnValue({});

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
  rest.get('*/api/trpc/notification.messages', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        input: {},
        result: {
          data: {
            json: mockNotificationMessages,
          },
        },
      }),
    );
  }),
  rest.post('*/api/trpc/notification.delete', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        input: {},
        result: {
          data: {
            json: mockDeleteNotification(),
          },
        },
      }),
    );
  }),
  rest.post('*/api/trpc/notification.read', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        input: {},
        result: {
          data: {
            json: mockReadNotification(),
          },
        },
      }),
    );
  }),
  rest.post('*/api/trpc/user.updateProfile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        input: {},
        result: {
          data: {
            json: {},
          },
        },
      }),
    );
  }),
  rest.get('*/api/trpc/project.all', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        input: {},
        result: {
          data: {
            json: [mockProject],
          },
        },
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
  rest.get('/api/auth/providers', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        github: {
          id: 'github',
          name: 'GitHub',
          type: 'oauth',
          signinUrl: 'http://localhost:3000/api/auth/signin/github',
          callbackUrl: 'http://localhost:3000/api/auth/callback/github',
        },
        google: {
          id: 'google',
          name: 'Google',
          type: 'oauth',
          signinUrl: 'http://localhost:3000/api/auth/signin/google',
          callbackUrl: 'http://localhost:3000/api/auth/callback/google',
        },
        twitter: {
          id: 'twitter',
          name: 'Twitter (Legacy)',
          type: 'oauth',
          signinUrl: 'http://localhost:3000/api/auth/signin/twitter',
          callbackUrl: 'http://localhost:3000/api/auth/callback/twitter',
        },
        credentials: {
          id: 'credentials',
          name: 'Anonymous',
          type: 'credentials',
          signinUrl: 'http://localhost:3000/api/auth/signin/credentials',
          callbackUrl: 'http://localhost:3000/api/auth/callback/credentials',
        },
        email: {
          id: 'email',
          name: 'Email',
          type: 'email',
          signinUrl: 'http://localhost:3000/api/auth/signin/email',
          callbackUrl: 'http://localhost:3000/api/auth/callback/email',
        },
      }),
    );
  }),
  rest.get('*/api/auth/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        expires: '2099-12-31T23:59:59.999Z',
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
  rest.get('*/api/stats/chirpy.dev/main-graph', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        interval: 'date',
        labels: [
          '2022-06-12',
          '2022-06-13',
          '2022-06-14',
          '2022-06-15',
          '2022-06-16',
          '2022-06-17',
          '2022-06-18',
        ],
        plot: [50, 87, 54, 48, 39, 53, 31],
        present_index: 6,
        sample_percent: 100,
        top_stats: [
          { change: -12, name: 'Unique visitors', value: 360 },
          { change: -73, name: 'Total pageviews', value: 481 },
          { change: 21, name: 'Bounce rate', value: 85 },
          { change: -64, name: 'Visit duration', value: 31 },
        ],
      }),
    );
  }),
];
