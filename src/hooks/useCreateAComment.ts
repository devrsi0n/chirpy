import { RTEValue } from '$/blocks/RichTextEditor/RichTextEditor';
import { useInsertOneCommentMutation } from '$/graphql/generated/comment';

import { useCurrentUser } from './useCurrentUser';

export type useCreateACommentOptions = {
  pageId: string;
};

export type SubmitHandler = (reply: RTEValue, commentId?: string | undefined) => Promise<void>;

export function useCreateAComment({ pageId }: useCreateACommentOptions): SubmitHandler {
  const { isLogin } = useCurrentUser();
  const [insertOneComment] = useInsertOneCommentMutation();

  const handleSubmitReply = async (reply: RTEValue, commentId?: string | undefined) => {
    if (!isLogin) {
      console.error('Please sign-in first');
      return Promise.reject();
    }
    const { data } = await insertOneComment({
      variables: {
        parentId: commentId,
        content: reply,
        pageId,
      },
    });
    if (!data?.insertOneComment?.id) {
      console.error(`Can't insert a comment, parentId ${commentId}`);
    }
  };
  return handleSubmitReply;
}
