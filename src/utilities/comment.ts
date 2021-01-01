import { CommentByPage, CreateOneLike } from '$/types/widget';
import { produce } from 'immer';

function deleteOneLikeInRelies(replies: CommentByPage[], commentId: string, likeId: string): void {
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
  comments: CommentByPage[],
  commentId: string,
  likeId: string,
): CommentByPage[] {
  return produce(comments, (_comments) => {
    deleteOneLikeInRelies(_comments, commentId, likeId);
  });
}

function createOneLikeInRelies(
  replies: CommentByPage['replies'],
  commentId: string,
  data: CreateOneLike,
): void {
  for (const reply of replies) {
    if (reply.id === commentId) {
      reply.likes.push(data);
      break;
    } else if ((reply as $TsAny).replies) {
      createOneLikeInRelies((reply as $TsAny).replies, commentId, data);
    }
  }
}

export function createOneLikeInComments(
  comments: CommentByPage[],
  commentId: string,
  data: CreateOneLike,
): CommentByPage[] {
  return produce(comments, (_comments) => {
    createOneLikeInRelies(_comments, commentId, data);
  });
}

export function updateReplyInComments(
  comments: CommentByPage[],
  commentId: string,
  replies: CommentByPage['replies'],
): CommentByPage[] {
  return produce(comments, (_comments) => {
    updateOneReply(_comments, commentId, replies);
  });
}

function updateOneReply(
  comments: CommentByPage[],
  commentId: string,
  newReplies: CommentByPage['replies'],
) {
  let counter = 0;
  for (const comment of comments) {
    const currReplies: CommentByPage['replies'] = (comment as $TsAny).replies;
    if (comment.id === commentId) {
      if (currReplies) {
        let insertCounter = 0;
        while (insertCounter < newReplies.length) {
          currReplies[insertCounter] = newReplies[insertCounter]!;
          insertCounter++;
        }
      } else {
        comments[counter].replies = newReplies;
      }
      break;
    } else if (currReplies) {
      updateOneReply(currReplies as CommentByPage[], commentId, newReplies);
    }
    counter++;
  }
}
