import * as React from 'react';

export type CommentContextType = {
  projectId: string;
  deleteAComment: (commentId: string) => Promise<void>;
};

export const CommentContext = React.createContext<CommentContextType>({
  projectId: '',
  deleteAComment: async () => {
    /* empty */
  },
});
