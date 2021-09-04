import * as React from 'react';

import { useToast } from '$/components/Toast';
import { useDeleteOneCommentMutation } from '$/graphql/generated/comment';

import { CommentContextType, CommentContext } from './CommentContext';

export type CommentContextProviderProps = React.PropsWithChildren<
  Pick<CommentContextType, 'projectId'>
>;

export function CommentContextProvider(props: CommentContextProviderProps) {
  const [deleteOneComment] = useDeleteOneCommentMutation();
  const { showToast } = useToast();
  const deleteAComment = React.useCallback(
    async (commentId: string) => {
      try {
        await deleteOneComment({ variables: { id: commentId } });
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
  const value = React.useMemo(
    () => ({ projectId: props.projectId, deleteAComment }),
    [props.projectId, deleteAComment],
  );

  return <CommentContext.Provider value={value}>{props.children}</CommentContext.Provider>;
}

export function useCommentContext() {
  const context = React.useContext(CommentContext);
  if (!context) {
    throw new Error('useCommentContext must be used within a CommentContextProvider');
  }
  return context;
}
