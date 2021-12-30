import { RTEValue } from '../RichTextEditor';

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
