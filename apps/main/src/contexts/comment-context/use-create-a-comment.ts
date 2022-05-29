import { JsonArray } from 'type-fest';

import { RTEValue } from '$/blocks/rich-text-editor';
import { useToast } from '$/components/toast';
import { useInsertOneCommentMutation } from '$/graphql/generated/comment';

import { useCurrentUser } from '../current-user-context/use-current-user';

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
      console.error('Navigate to login page');
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
      console.error(`Can't insert a comment, parentId ${commentId}`);
    }
  };
  return createAComment;
}
