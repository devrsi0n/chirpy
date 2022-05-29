import * as React from 'react';

import { UseCreateAComment } from './use-create-a-comment';
import { UseDeleteAComment } from './use-delete-a-comment';
import { UseToggleALikeAction } from './use-toggle-a-like-action';

export type CommentContextType = {
  projectId: string;
  pageId: string;
  createAComment: UseCreateAComment;
  deleteAComment: UseDeleteAComment;
  toggleALikeAction: UseToggleALikeAction;
};

export const CommentContext = React.createContext<CommentContextType>({
  projectId: '',
  pageId: '',
  createAComment: async () => {
    console.warn('CommentContext.createAComment is not implemented');
  },
  deleteAComment: async () => {
    console.warn('CommentContext.deleteAComment is not implemented');
  },
  toggleALikeAction: async () => {
    console.warn('CommentContext.toggleALikeAction is not implemented');
  },
});

// eslint-disable-next-line unicorn/prefer-export-from
export type { UseCreateAComment, UseDeleteAComment, UseToggleALikeAction };
