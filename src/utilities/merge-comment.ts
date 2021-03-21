import { produce } from 'immer';

import { CommentLeaf } from '$/types/widget';

export function updateReplyInComments(
  comments: CommentLeaf[],
  commentId: string,
  insertedReplies: CommentLeaf['replies'],
): CommentLeaf[] {
  return produce(comments, (_comments) => {
    updateOneReply(_comments, commentId, insertedReplies);
  });
}

function updateOneReply(
  comments: CommentLeaf[],
  commentId: string,
  insertedReplies: CommentLeaf['replies'],
) {
  let counter = 0;
  for (const comment of comments) {
    const currReplies: CommentLeaf['replies'] = (comment as $TsAny).replies;
    if (comment.id === commentId) {
      comments[counter].replies.push(...insertedReplies);
      break;
    } else if (currReplies) {
      updateOneReply(currReplies as CommentLeaf[], commentId, insertedReplies);
    }
    counter++;
  }
}
