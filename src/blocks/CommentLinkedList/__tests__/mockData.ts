import { CommentLinkedListProps } from '../CommentLinkedList';

export function generateComment(): CommentLinkedListProps['comment'] {
  return {
    parent: generateCommentFragment('parent-1', 1),
    ...generateCommentFragment('1', 2),
    replies: [generateCommentFragment('sub-1', 3)],
  };
}
let counter = 0;
export function generateCommentFragment(fill: string, depth: number) {
  return {
    id: `comment-id-${fill}`,
    user: {
      id: counter++,
      name: `author-name-${fill}`,
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
        userId: counter++,
      },
    ],
    depth,
    pageId: `page-id-${fill}`,
    parentId: `parent-id-${fill}`,
  };
}

export function getTextsOfComment(comment: CommentLinkedListProps['comment']) {
  return {
    parent: {
      text: comment.parent ? getTextOfContent(comment.parent.content as any) : '',
    },
    text: getTextOfContent(comment.content as any),
    replies: comment.replies.map((reply) => getTextOfContent(reply.content as any)),
  };
}

function getTextOfContent(
  content: {
    type: string;
    children: {
      text: string;
    }[];
  }[],
): string {
  return content[0].children[0].text;
}
