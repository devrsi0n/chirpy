export const PAGE_ID = 'b5a16120-593c-492f-ad94-e14d247485f3';
export const PROJECT_ID = '3c5d2d41-e2df-4b31-98f8-6e471acab461';

export const PREVIEW_COMMENTS = [
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
    createdAt: '2021-04-17T01:43:10.581584+00:00',
    parentId: null,
    pageId: PAGE_ID,
    user: {
      __typename: 'User',
      id: '634da1be-cc04-4719-908e-c642de76e292',
      name: 'Jane',
      avatar: '/images/avatars/female-1.jpeg',
    },
    likes: [],
    replies: [
      {
        __typename: 'Comment',
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
        createdAt: '2021-04-17T02:31:51.05373+00:00',
        parentId: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
        pageId: PAGE_ID,
        user: {
          __typename: 'User',
          id: '634da1be-cc04-4719-908e-c642de76e292',
          name: 'Dianne',
          avatar: '/images/avatars/female-2.jpeg',
        },
        likes: [],
        replies: [],
      },
    ],
  },
  {
    __typename: 'Comment',
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
    createdAt: '2021-04-17T02:51:30.517834+00:00',
    parentId: null,
    pageId: PAGE_ID,
    user: {
      __typename: 'User',
      id: '634da1be-cc04-4719-908e-c642de76e292',
      name: 'William',
      avatar: '/images/avatars/male-1.jpeg',
    },
    likes: [],
    replies: [],
  },
];
