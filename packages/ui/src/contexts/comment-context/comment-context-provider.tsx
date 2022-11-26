import { useRouter } from 'next/router';
import * as React from 'react';

import {
  CommentContextType,
  CommentContext,
  RefetchComments,
} from './comment-context';
import { useCreateAComment } from './use-create-a-comment';
import { useDeleteAComment } from './use-delete-a-comment';
import { useToggleALikeAction } from './use-toggle-a-like-action';

export type CommentContextProviderProps = React.PropsWithChildren<
  RefetchComments & Pick<CommentContextType, 'projectId' | 'pageId'>
>;

export function CommentContextProvider(props: CommentContextProviderProps) {
  const createAComment = useCreateAComment({
    pageId: props.pageId,
    refetchComments: props.refetchComments,
  });
  const deleteAComment = useDeleteAComment(props.refetchComments);
  const toggleALikeAction = useToggleALikeAction();
  const router = useRouter();
  const onClickCommentTimeline = React.useCallback(
    (href: string) => {
      router.push(href);
    },
    [router],
  );
  const value: CommentContextType = React.useMemo(
    () => ({
      projectId: props.projectId,
      pageId: props.pageId,
      refetchComments: props.refetchComments,
      createAComment,
      deleteAComment,
      toggleALikeAction,
      onClickCommentTimeline,
    }),
    [
      props.projectId,
      props.pageId,
      createAComment,
      deleteAComment,
      toggleALikeAction,
      onClickCommentTimeline,
    ],
  );

  return (
    <CommentContext.Provider value={value}>
      {props.children}
    </CommentContext.Provider>
  );
}

export function useCommentContext() {
  const context = React.useContext(CommentContext);
  if (!context) {
    throw new Error(
      'useCommentContext must be used within a CommentContextProvider',
    );
  }
  return context;
}
