import { RTEValue } from '@chirpy/types';

export const PLACEHOLDER_OF_DELETED_COMMENT: RTEValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '<Deleted by moderator>',
        },
      ],
    },
  ],
};
