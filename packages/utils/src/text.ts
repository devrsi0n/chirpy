import { JSONContent } from '@tiptap/react';

import { RTEValue } from 'types';

export function getTextFromRteDoc(doc: JSONContent): string {
  let text = '';
  const stack: JSONContent[] = [doc];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node?.whiteSpace) {
      text += ' ';
    }
    text += node?.text || '';
    if (node?.content) {
      node.content[node.content.length - 1].whiteSpace = true;
      for (let i = node.content.length - 1; i >= 0; i--) {
        stack.push(node.content[i]);
      }
    }
  }
  return text.replace(/\s{2,}/g, ' ').trim();
}

export function getTextFromRteValue(value: RTEValue): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => getTextFromRteValue(v)).join('\n');
  }
  return getTextFromRteDoc(value);
}
