import { CurrentNotificationMessagesQuery } from '@chirpy-dev/graphql';

export const mockNotificationData: CurrentNotificationMessagesQuery = {
  notificationMessages: [
    {
      id: '4b1e5733-09d1-4a30-94ad-3a759a071b89',
      recipient: {
        id: 'ffd9d667-9b90-4a88-adde-a6dbf80111d0',
        name: 'Qing',
        username: 'qing',
        email: 'qing@chirpy.dev',
        image: 'https://avatars.githubusercontent.com/u/128sdsdf?v=4',
      },
      type: 'ReceivedAComment',
      url: 'http://localhost:3000/play',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'xia',
        username: 'xia',
        email: 'xia@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/asdfaw2ds?v=4',
      },
      content: 'testing',
      read: false,
      createdAt: '2022-04-20T12:39:18.284708+00:00',
    },
  ],
};
