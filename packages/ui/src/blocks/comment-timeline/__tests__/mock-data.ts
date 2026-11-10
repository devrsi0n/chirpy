import { CommentTimelineProps } from '../comment-timeline';

export function generateComment(): NonNullable<
  CommentTimelineProps['comment']
> {
  return {
    ...generateCommentFragment('1'),
    parent: generateCommentFragment('parent-1'),
    replies: [generateCommentFragment('sub-1')],
  };
}
let counter = 0;
export function generateCommentFragment(fill: string) {
  return {
    id: `comment-id-${fill}`,
    user: {
      id: String(counter++),
      name: `author-name-${fill}`,
      image: `author-avatar-${fill}`,
      username: null,
      email: null,
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `comment content ${fill}`,
            },
          ],
        },
      ],
    },
    createdAt: new Date(`2021-06-21T14:12:13.813625+00:00`),
    updatedAt: new Date('2021-06-21T14:12:13.813Z'),
    userId: `author-${fill}`,
    pinnedAt: null,
    deletedAt: null,
    likes: [
      {
        id: `like-id-${fill}`,
        userId: String(counter++),
      },
    ],

    pageId: `page-id-${fill}`,
    parentId: `parent-id-${fill}`,
    parent: null,
    replies: [],
  };
}

export function getTextsOfComment(
  comment: NonNullable<CommentTimelineProps['comment']>,
) {
  return {
    parent: {
      text: comment.parent
        ? getTextOfContent(comment.parent.content as any)
        : '',
    },
    text: getTextOfContent(comment.content as any),
    replies: comment.replies.map((reply) =>
      getTextOfContent(reply.content as any),
    ),
  };
}

function getTextOfContent(content: {
  type: 'doc';
  content: [
    {
      type: 'paragraph';
      content: [
        {
          type: 'text';
          text: string;
        },
      ];
    },
  ];
}): string {
  return content.content[0].content[0].text;
}
