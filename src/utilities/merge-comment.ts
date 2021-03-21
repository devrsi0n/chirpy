import { produce } from 'immer';

import { CommentLeafType } from '$/types/widget';

export function updateReplyInComments(
  comments: CommentLeafType[],
  commentId: string,
  insertedReplies: CommentLeafType['replies'],
): CommentLeafType[] {
  return produce(comments, (_comments) => {
    updateOneReply(_comments, commentId, insertedReplies);
  });
}

function updateOneReply(
  comments: CommentLeafType[],
  commentId: string,
  insertedReplies: CommentLeafType['replies'],
) {
  let counter = 0;
  for (const comment of comments) {
    comments[counter].replies = comments[counter].replies || [];
    const currReplies: CommentLeafType['replies'] = (comment as $TsAny).replies;
    if (comment.id === commentId) {
      comments[counter].replies.push(...insertedReplies);
      break;
    } else if (currReplies) {
      updateOneReply(currReplies as CommentLeafType[], commentId, insertedReplies);
    }
    counter++;
  }
}
