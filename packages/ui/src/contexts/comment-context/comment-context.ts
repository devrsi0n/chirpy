import { asyncNoop, noop } from '@chirpy-dev/utils';
import * as React from 'react';

import { trpcClient } from '../../utilities/trpc-client';
import { UseCreateAComment } from './use-create-a-comment';
import { UseDeleteAComment } from './use-delete-a-comment';
import { UseToggleALikeAction } from './use-toggle-a-like-action';

export type CommentContextType = {
  projectId: string;
  pageId: string;
  createAComment: UseCreateAComment;
  deleteAComment: UseDeleteAComment;
  toggleALikeAction: UseToggleALikeAction;
  onClickCommentTimeline: (href: string) => void;
  hideCommentTimeline?: true;
};

export const CommentContext = React.createContext<CommentContextType>({
  projectId: '',
  pageId: '',
  createAComment: asyncNoop,
  deleteAComment: asyncNoop,
  toggleALikeAction: asyncNoop,
  onClickCommentTimeline: noop,
});

// eslint-disable-next-line unicorn/prefer-export-from
export type { UseCreateAComment, UseDeleteAComment, UseToggleALikeAction };

export type RefetchComment = {
  refetchComment: ReturnType<
    | typeof trpcClient.comment.forest.useQuery
    | typeof trpcClient.comment.timeline.useQuery
  >['refetch'];
};
