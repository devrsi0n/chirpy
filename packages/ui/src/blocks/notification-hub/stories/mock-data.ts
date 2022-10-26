import { CurrentNotificationMessagesQuery } from '@chirpy-dev/graphql';

export const messages: CurrentNotificationMessagesQuery = {
  notificationMessages: [
    {
      id: '1',
      recipient: {
        id: 'ffd9d667-9b90-4a88-adde-a6dbf80111d0',
        name: 'Qing',
        image: 'https://avatars.githubusercontent.com/u/7880675?v=4',
      },
      type: 'ReceivedALike',
      url: 'http://localhost:3000/playground',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'Dan',
        image: 'https://avatars.githubusercontent.com/u/32698452?v=4',
      },
      content: null,
      read: false,
      createdAt: '2022-04-17T02:27:34.830834+00:00',
    },
    {
      id: '2',
      recipient: {
        id: 'ffd9d667-9b90-4a88-adde-a6dbf80111d0',
        name: 'Qing',
        image: 'https://avatars.githubusercontent.com/u/7880675?v=4',
      },
      type: 'ReceivedAComment',
      url: 'http://localhost:3000/playground',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'Dan',
        image: 'https://avatars.githubusercontent.com/u/32698452?v=4',
      },
      content: 'React 18 is now available on npm!',
      read: false,
      createdAt: '2022-04-17T02:04:13.776034+00:00',
    },
    {
      id: '3',
      recipient: {
        id: 'ffd9d667-9b90-4a88-adde-a6dbf80111d0',
        name: 'Qing',
        image: 'https://avatars.githubusercontent.com/u/7880675?v=4',
      },
      type: 'ReceivedAComment',
      url: 'http://localhost:3000/playground',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'Dan',
        image: 'https://avatars.githubusercontent.com/u/32698452?v=4',
      },
      content: 'This message has been read',
      read: true,
      createdAt: '2022-04-10T02:04:13.776034+00:00',
    },
  ],
};
