import { asyncNoop, noop } from '@chirpy-dev/utils';
import * as React from 'react';

import { UseCreateAComment } from './use-create-a-comment';
import { UseDeleteAComment } from './use-delete-a-comment';
import { UseToggleALikeAction } from './use-toggle-a-like-action';

export type CommentContextType = {
  projectId: string;
  page: {
    id: string;
    authorId: string | null;
  };
  createAComment: UseCreateAComment;
  deleteAComment: UseDeleteAComment;
  toggleALikeAction: UseToggleALikeAction;
  onClickCommentTimeline: (href: string) => void;
};

export const CommentContext = React.createContext<CommentContextType>({
  projectId: '',
  page: {
    id: '',
    authorId: null,
  },
  createAComment: asyncNoop,
  deleteAComment: asyncNoop,
  toggleALikeAction: asyncNoop,
  onClickCommentTimeline: noop,
});

// eslint-disable-next-line unicorn/prefer-export-from
export type { UseCreateAComment, UseDeleteAComment, UseToggleALikeAction };
