import { RTEValue } from '../RichTextEditor';

export const PLACEHOLDER_OF_DELETED_COMMENT: RTEValue = [
  {
    type: 'paragraph',
    children: [{ text: 'This comment was deleted by moderator', italic: true, underline: true }],
  },
];
