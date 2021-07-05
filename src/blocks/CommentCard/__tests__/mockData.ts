export function generateCommentCard(fill: string) {
  return {
    commentId: `comment-id-${fill}`,
    author: {
      id: `author-id-${fill}`,
      displayName: `author-name-${fill}`,
      avatar: `author-avatar-${fill}`,
    },
    content: [
      {
        type: 'paragraph',
        children: [{ text: `comment content ${fill}` }],
      },
    ],
    createdAt: `2021-06-21T14:12:13.813625+00:00`,
    likes: [
      {
        id: `like-id-${fill}`,
        userId: `like-user-id-${fill}`,
      },
    ],
    depth: 1,
  };
}
