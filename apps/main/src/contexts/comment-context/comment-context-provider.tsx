import * as React from 'react';

import { CommentContextType, CommentContext } from './comment-context';
import { useCreateAComment } from './use-create-a-comment';
import { useDeleteAComment } from './use-delete-a-comment';
import { useToggleALikeAction } from './use-toggle-a-like-action';

export type CommentContextProviderProps = React.PropsWithChildren<
  Pick<CommentContextType, 'projectId' | 'pageId'>
>;

export function CommentContextProvider(props: CommentContextProviderProps) {
  const createAComment = useCreateAComment({ pageId: props.pageId });
  const deleteAComment = useDeleteAComment();
  const toggleALikeAction = useToggleALikeAction();
  const value: CommentContextType = React.useMemo(
    () => ({
      projectId: props.projectId,
      pageId: props.pageId,
      createAComment,
      deleteAComment,
      toggleALikeAction,
    }),
    [props.projectId, props.pageId, createAComment, deleteAComment, toggleALikeAction],
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
