import { JsonArray } from 'type-fest';

import { RTEValue } from '$/blocks/rich-text-editor';
import { useToast } from '$/components/toast';
import { useInsertOneCommentMutation } from '$/graphql/generated/comment';

import { useCurrentUser } from '../contexts/current-user-context/use-current-user';

export type useCreateACommentOptions = {
  pageId: string;
};

export type SubmitHandler = (reply: RTEValue, commentId?: string) => Promise<void>;

export function useCreateAComment({ pageId }: useCreateACommentOptions): SubmitHandler {
  const { isSignIn } = useCurrentUser();
  const [{}, insertOneComment] = useInsertOneCommentMutation();

  const { showToast } = useToast();

  const handleSubmitReply: SubmitHandler = async (reply: RTEValue, commentId?: string) => {
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
  return handleSubmitReply;
}
