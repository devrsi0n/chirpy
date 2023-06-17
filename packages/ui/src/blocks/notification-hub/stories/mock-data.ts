import { RouterOutputs } from '../@chirpy-dev/trpc/src/client';

export const mockNotificationMessages: RouterOutputs['notification']['messages'] =
  [
    {
      id: '1',
      type: 'ReceivedALike',
      url: 'http://localhost:3000/playground',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'Dan',
        username: 'dan',
        email: 'dan@test.com',
        image: 'https://avatars.githubusercontent.com/u/32698452?v=4',
      },
      content: null,
      read: false,
      createdAt: new Date('2022-04-17T02:27:34.830834+00:00'),
    },
    {
      id: '2',
      type: 'ReceivedAComment',
      url: 'http://localhost:3000/playground',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'Dan',
        username: 'dan',
        email: 'dan@test.com',
        image: 'https://avatars.githubusercontent.com/u/32698452?v=4',
      },
      content: 'React 18 is now available on npm!',
      read: false,
      createdAt: new Date('2022-04-17T02:04:13.776034+00:00'),
    },
    {
      id: '3',
      type: 'ReceivedAComment',
      url: 'http://localhost:3000/playground',
      triggeredBy: {
        id: 'ff157d69-2f7d-45c7-a577-1ee073564e60',
        name: 'Dan',
        username: 'dan',
        email: 'dan@test.com',
        image: 'https://avatars.githubusercontent.com/u/32698452?v=4',
      },
      content: 'This message has been read',
      read: true,
      createdAt: new Date('2022-04-10T02:04:13.776034+00:00'),
    },
  ];
