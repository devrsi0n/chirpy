import { asyncNoop, noop } from '@chirpy-dev/utils';
import * as React from 'react';

import type { UseCreateAComment } from './use-create-a-comment';
import type { UseDeleteAComment } from './use-delete-a-comment';
import type { UseToggleALikeAction } from './use-toggle-a-like-action';
import type { UseToggleAPinAction } from './use-toggle-a-pin-action';

export type CommentContextType = {
  projectId: string;
  page: {
    id: string;
    authorId: string | null;
  };
  createAComment: UseCreateAComment;
  deleteAComment: UseDeleteAComment;
  toggleALikeAction: UseToggleALikeAction;
  toggleAPinAction: UseToggleAPinAction;
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
  toggleAPinAction: asyncNoop,
});

// eslint-disable-next-line unicorn/prefer-export-from
export type { UseDeleteAComment, UseToggleALikeAction, UseToggleAPinAction };

export { type UseCreateAComment } from './use-create-a-comment';
