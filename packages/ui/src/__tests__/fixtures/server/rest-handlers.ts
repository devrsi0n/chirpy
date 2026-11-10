import { http, HttpResponse } from 'msw';

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
  http.get('*/api/trpc/analytics.pageviewMetric', () =>
    HttpResponse.json({ result: { data: { json: { pageviews: 212 } } } }),
  ),
  http.post('*/api/trpc/project.delete', () =>
    HttpResponse.json({ result: { data: { json: { count: 1 } } } }),
  ),
  http.post('*/api/trpc/revalidate.url', () =>
    HttpResponse.json({ result: { data: { json: null } } }),
  ),
  http.get('*/api/trpc/notification.messages', () => {
    return HttpResponse.json({
      input: {},
      result: {
        data: {
          json: mockNotificationMessages,
        },
      },
    });
  }),
  http.post('*/api/trpc/notification.delete', () => {
    return HttpResponse.json({
      input: {},
      result: {
        data: {
          json: mockDeleteNotification(),
        },
      },
    });
  }),
  http.post('*/api/trpc/notification.read', () => {
    return HttpResponse.json({
      input: {},
      result: {
        data: {
          json: mockReadNotification(),
        },
      },
    });
  }),
  http.post('*/api/trpc/user.updateProfile', () => {
    return HttpResponse.json({
      input: {},
      result: {
        data: {
          json: {},
        },
      },
    });
  }),
  http.get('*/api/trpc/project.all', () => {
    return HttpResponse.json({
      input: {},
      result: {
        data: {
          json: [mockProject],
        },
      },
    });
  }),
  http.get('*/api/auth/logout', () => {
    const result = mockLogout();
    if (result) {
      return HttpResponse.json(result);
    }
    return HttpResponse.json({
      id: MOCK_PAGE_ID,
    });
  }),
  http.get('/api/auth/providers', () => {
    return HttpResponse.json({
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
    });
  }),
  http.get('*/api/auth/session', () => {
    return HttpResponse.json({
      expires: '2099-12-31T23:59:59.999Z',
      user: {
        id: 'user-id',
        name: 'session user name',
        email: 'test@session.com',
        image: 'https://image.test',
      },
    });
  }),
];
