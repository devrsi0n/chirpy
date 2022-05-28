import * as React from 'react';

import { useToast } from '$/components/toast';
import { useDeleteOneCommentMutation } from '$/graphql/generated/comment';

export type UseDeleteAComment = ReturnType<typeof useDeleteAComment>;

export function useDeleteAComment() {
  const [{}, deleteOneComment] = useDeleteOneCommentMutation();
  const { showToast } = useToast();
  const deleteAComment = React.useCallback(
    async (commentId: string) => {
      try {
        await deleteOneComment({ id: commentId });
        showToast({
          type: 'success',
          title: 'Deleted successfully!',
        });
      } catch {
        showToast({
          type: 'error',
          title: 'Sorry, something wrong happened in our side',
          description: 'Please try again later',
        });
      }
    },
    [showToast, deleteOneComment],
  );
  return deleteAComment;
}
