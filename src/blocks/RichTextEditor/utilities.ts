import { Transforms, Editor, Text } from 'slate';
import { Format } from './type';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

// Define our own custom set of helpers.
export const CustomEditor = {
  isBoldMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });

    return !!match;
  },

  isFormatActive(editor: Editor, format: Format): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      mode: 'all',
    });
    return !!match;
  },

  toggleFormat(editor: Editor, format: Format): void {
    const isActive = CustomEditor.isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true },
    );
  },

  toggleBoldMark(editor: Editor): void {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor: Editor): void {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },
};

export function toggleBlock(editor: Editor, format: Format): void {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

export function toggleMark(editor: Editor, format: Format): void {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(editor: Editor, format: Format): boolean {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
}

export function isMarkActive(editor: Editor, format: Format): boolean {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}
