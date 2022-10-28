import { JsonArray } from 'type-fest';

import { RTEValue } from 'types';
import { useToast } from '../../components/toast';
import { useInsertOneCommentMutation } from '@chirpy-dev/graphql';
import { logger } from '../../utilities/logger';

import { useCurrentUser } from '../current-user-context';

export type useCreateACommentOptions = {
  pageId: string;
};

export type UseCreateAComment = ReturnType<typeof useCreateAComment>;

export function useCreateAComment({ pageId }: useCreateACommentOptions) {
  const { isSignIn } = useCurrentUser();
  const [{}, insertOneComment] = useInsertOneCommentMutation();
  const { showToast } = useToast();

  const createAComment = async (reply: RTEValue, commentId?: string) => {
    if (!isSignIn) {
      logger.error('Navigate to sign-in page');
      throw undefined;
    }
    const { data } = await insertOneComment({
      parentId: commentId,
      content: reply as JsonArray,
      pageId,
    });
    if (!data?.insertOneComment?.id) {
      showToast({
        type: 'error',
        title: `Server didn't respond, please try again later.`,
      });
      logger.error(`Can't insert a comment, parentId ${commentId}`);
    }
  };
  return createAComment;
}
