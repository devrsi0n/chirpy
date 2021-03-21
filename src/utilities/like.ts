import { produce } from 'immer';

import { CommentLeaf, InsertOneLike } from '$/types/widget';

function deleteOneLikeInRelies(replies: CommentLeaf[], commentId: string, likeId: string): void {
  for (const reply of replies) {
    if (reply.id === commentId) {
      const index = reply.likes.findIndex(({ id }) => id === likeId);
      if (index !== -1) {
        reply.likes.splice(index, 1);
      }
      break;
    } else if ((reply as $TsAny).replies) {
      deleteOneLikeInRelies((reply as $TsAny).replies, commentId, likeId);
    }
  }
}

export function deleteOneLikeInComments(
  comments: CommentLeaf[],
  commentId: string,
  likeId: string,
): CommentLeaf[] {
  return produce(comments, (_comments) => {
    deleteOneLikeInRelies(_comments, commentId, likeId);
  });
}

function createOneLikeInRelies(
  replies: CommentLeaf['replies'],
  commentId: string,
  insertedLike: InsertOneLike,
): void {
  for (const reply of replies) {
    if (reply.id === commentId) {
      reply.likes.push(insertedLike);
      break;
    } else if ((reply as $TsAny).replies) {
      createOneLikeInRelies((reply as $TsAny).replies, commentId, insertedLike);
    }
  }
}

export function createOneLikeInComments(
  comments: CommentLeaf[],
  commentId: string,
  insertedLike: InsertOneLike,
): CommentLeaf[] {
  return produce(comments, (_comments) => {
    createOneLikeInRelies(_comments, commentId, insertedLike);
  });
}
