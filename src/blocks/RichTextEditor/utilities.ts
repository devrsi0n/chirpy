import { Transforms, Editor, Element as SlateElement, Descendant } from 'slate';
import { CustomElement } from 'types/slate';
import { RTEValue } from '.';

import { BlockFormat, InlineFormat } from './type';

const LIST_TYPES = new Set(['numbered-list', 'bulleted-list']);

export function toggleBlock(editor: Editor, format: BlockFormat): void {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.has(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.has((!Editor.isEditor(n) && SlateElement.isElement(n) && n.type) || ''),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
}

export function toggleMark(editor: Editor, format: InlineFormat): void {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(editor: Editor, format: BlockFormat): boolean {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
}

export function isMarkActive(editor: Editor, format: InlineFormat): boolean {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

export function isValueEmpty(value: RTEValue): boolean {
  for (const val of value) {
    if (!isEmptyDescendant(val)) {
      return false;
    }
  }
  return true;
}

function isEmptyDescendant(descendant: Descendant): boolean {
  if (SlateElement.isElement(descendant)) {
    return isValueEmpty(descendant.children);
  }
  return !descendant.text;
}
