import { http, HttpResponse } from 'msw';

export const sbRestHandlers = [
  http.get('*/api/auth/session', () => {
    return HttpResponse.json({
      user: {
        name: 'Storybook',
        email: 'test@storybook.com',
        image: 'https://storybook.js.org/images/logos/icon-storybook.png',
        id: '1',
        editableProjectIds: ['2'],
      },
      expires: '2099-05-30T13:00:21.586Z',
    });
  }),
];
