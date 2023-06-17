import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { JSONContent } from '@tiptap/react';
import * as React from 'react';

import { useToast } from '../../components/toast';
import { RefetchComment } from './comment-context';

export type UseDeleteAComment = ReturnType<typeof useDeleteAComment>;

export function useDeleteAComment(refetch: RefetchComment['refetchComment']) {
  const { mutateAsync: deleteOneComment } =
    trpcClient.comment.delete.useMutation();
  const { showToast } = useToast();
  const { mutate: mutateANotification } =
    trpcClient.notification.mutate.useMutation();
  const deleteAComment = React.useCallback(
    async (commentId: string) => {
      try {
        const data = await deleteOneComment(commentId);
        mutateANotification({
          op: 'DELETE',
          comment: {
            id: data.id,
            userId: data.userId,
            parentId: data.parentId,
            content: data.content as JSONContent,
          },
        });
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
    [showToast, deleteOneComment, mutateANotification],
  );
  return deleteAComment;
}
