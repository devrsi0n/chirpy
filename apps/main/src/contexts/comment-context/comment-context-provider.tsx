import { useRouter } from 'next/router';
import * as React from 'react';

import { CommentContext, CommentContextType } from './comment-context';
import { useCreateAComment } from './use-create-a-comment';
import { useDeleteAComment } from './use-delete-a-comment';
import { useToggleALikeAction } from './use-toggle-a-like-action';

export type CommentContextProviderProps = React.PropsWithChildren<{
  projectId: string;
  page: {
    id: string;
    authorId: string | null;
  };
}>;

export function CommentContextProvider(props: CommentContextProviderProps) {
  const createAComment = useCreateAComment({
    pageId: props.page.id,
  });
  const deleteAComment = useDeleteAComment();
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
      page: props.page,
      createAComment,
      deleteAComment,
      toggleALikeAction,
      onClickCommentTimeline,
    }),
    [
      props.projectId,
      props.page,
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
