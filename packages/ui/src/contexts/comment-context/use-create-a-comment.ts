import { trpc } from '@chirpy-dev/trpc/src/client';
import { RTEValue } from '@chirpy-dev/types';
import { JSONContent } from '@chirpy-dev/utils';
import { JsonArray } from 'type-fest';

import { useToast } from '../../components/toast';
import { logger } from '../../utilities/logger';
import { useCurrentUser } from '../current-user-context';

export type useCreateACommentOptions = {
  pageId: string;
};

export type UseCreateAComment = ReturnType<typeof useCreateAComment>;

export function useCreateAComment({ pageId }: useCreateACommentOptions) {
  const { isSignIn } = useCurrentUser();
  const { mutateAsync: insertOneComment } = trpc.comment.create.useMutation();
  const { showToast } = useToast();
  const { mutate: mutateANotification } =
    trpc.notification.mutate.useMutation();
  const createAComment = async (reply: RTEValue, commentId?: string) => {
    if (!isSignIn) {
      logger.error('Navigate to sign-in page');
      throw undefined;
    }
    const data = await insertOneComment({
      parentId: commentId,
      content: reply as JsonArray,
      pageId,
    });
    // Move it to server background process once we have a new arch
    mutateANotification({
      op: 'INSERT',
      comment: {
        id: data.id,
        userId: data.userId,
        parentId: data.parentId,
        content: data.content as JSONContent,
      },
    });
    if (!data?.id) {
      showToast({
        type: 'error',
        title: `Server didn't respond, please try again later.`,
      });
      logger.error(`Can't insert a comment, parentId ${commentId}`);
    }
  };
  return createAComment;
}
