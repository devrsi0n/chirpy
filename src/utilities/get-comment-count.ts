import { CommentTreeSubscription } from '$/graphql/generated/comment';

export function getCommentCount(comments: CommentTreeSubscription['comments']): number {
  let counter = 0;
  for (const comment of comments) {
    if (comment.replies) {
      counter += getCommentCount((comment.replies as unknown) as CommentTreeSubscription['comments']) + 1;
    } else {
      counter++;
    }
  }
  return counter;
}
