import * as React from 'react';

import { useToast } from '../../components/toast';
import { trpcClient } from '../../utilities/trpc-client';
import { RefetchComments } from './comment-context';

export type UseDeleteAComment = ReturnType<typeof useDeleteAComment>;

export function useDeleteAComment(refetch: RefetchComments['refetchComments']) {
  const { mutateAsync: deleteOneComment } =
    trpcClient.comment.delete.useMutation();
  const { showToast } = useToast();
  const deleteAComment = React.useCallback(
    async (commentId: string) => {
      try {
        await deleteOneComment(commentId);
        await refetch();
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
