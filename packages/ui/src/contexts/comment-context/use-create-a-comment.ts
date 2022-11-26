import { RTEValue } from '@chirpy-dev/types';
import { JsonArray } from 'type-fest';

import { useToast } from '../../components/toast';
import { logger } from '../../utilities/logger';
import { trpcClient } from '../../utilities/trpc-client';
import { useCurrentUser } from '../current-user-context';
import { RefetchComment } from './comment-context';

export type useCreateACommentOptions = {
  pageId: string;
} & RefetchComment;

export type UseCreateAComment = ReturnType<typeof useCreateAComment>;

export function useCreateAComment({
  pageId,
  refetchComment: refetchComments,
}: useCreateACommentOptions) {
  const { isSignIn } = useCurrentUser();
  const { mutateAsync: insertOneComment } =
    trpcClient.comment.create.useMutation();
  const { showToast } = useToast();

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
    await refetchComments();
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
