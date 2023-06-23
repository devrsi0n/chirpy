import { RouterOutputs } from '@chirpy-dev/trpc/src/client';

export function getCommentCount(
  comments: RouterOutputs['comment']['forest'],
): number {
  let counter = 0;
  for (const comment of comments) {
    if (comment.replies) {
      counter +=
        getCommentCount(
          comment.replies as unknown as RouterOutputs['comment']['forest'],
        ) + 1;
    } else if (!comment.deletedAt) {
      counter++;
    }
  }
  return counter;
}
