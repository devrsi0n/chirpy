export function generateCommentCard(fill: number) {
  return {
    commentId: `comment-id-${fill}`,
    author: {
      id: fill.toString(),
      name: `author-name-${fill}`,
      username: `author-username-${fill}`,
      image: `author-avatar-${fill}`,
      email: 'comment@email.com',
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'test data',
            },
          ],
        },
      ],
    },
    createdAt: new Date(`2021-06-21T14:12:13.813625+00:00`),
    likes: [
      {
        id: `like-id-${fill}`,
        userId: fill.toString(),
      },
    ],
  };
}
