import { Like, User } from '@chirpy-dev/trpc/src/ui';
import dayjs from 'dayjs';

import { CommentLeafType } from '../../types';

export const PAGE_ID = 'b5a16120-593c-492f-ad94-e14d247485f3';
export const PROJECT_ID = '3c5d2d41-e2df-4b31-98f8-6e471acab461';

const UserJane = {
  __typename: 'User' as const,
  id: '634da1be-cc04-4719-908e-c642de76e292',
  name: 'Jane',
  image: '/images/avatars/female-1.jpeg',
} as unknown as User;

export const getPreviewComments = (date: string): CommentLeafType[] => {
  const dateTime = dayjs(date);
  return [
    {
      __typename: 'Comment',
      id: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Your article is 100% gorgeous 😍',
              },
            ],
          },
        ],
      },
      createdAt: dateTime.subtract(50, 'hours').toDate(),
      parentId: null,
      pageId: PAGE_ID,
      user: UserJane,
      likes: [],
      replies: [
        {
          id: '87110a09-9a4b-4f41-8784-6f8512449ddf',
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Can't agree more!`,
                  },
                ],
              },
            ],
          },
          createdAt: dateTime.subtract(49, 'hours').toDate(),
          parentId: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
          pageId: PAGE_ID,
          user: {
            id: '634da1be-cc04-4719-908e-c642de76e292',
            name: 'Dianne',
            image: '/images/avatars/female-2.jpeg',
          } as User,
          likes: [
            {
              id: 'dd4812a5-031f-4534-8713-be586927081f',
              userId: UserJane.id,
            } as Like,
          ],
          replies: [],
        },
      ] as any,
    },
    {
      id: '7a024861-7dce-4513-9f8a-c9e91d975da4',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Interesting, thanks for sharing.',
              },
            ],
          },
        ],
      },
      createdAt: dateTime.subtract(25, 'hours').toDate(),
      parentId: null,
      pageId: PAGE_ID,
      user: {
        id: '634da1be-cc04-4719-908e-c642de76e292',
        name: 'William',
        image: '/images/avatars/male-1.jpeg',
      } as User,
      likes: [],
      replies: [],
    } as any,
  ];
};
