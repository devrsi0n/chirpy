// @refresh reset
import * as React from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import clsx from 'clsx';

import { Leaf } from './Leaf';
import { Element } from './Element';
import { RichTextEditorContext } from './RichTextEditorContext';

import { Toolbar } from './Toolbar';
import { MarkButton } from './Button';

interface IBaseProps {
  children?: React.ReactNode;
  value?: Node[];
  onChange?(value: Node[]): void;
  className?: string;
  readOnly?: boolean;
}

interface IRichTextEditorProps extends IBaseProps {
  disabled?: boolean;
  placeholder?: Node[];
}

const STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_NAME}RTEContent`;

const DEFAULT_INPUT = [
  {
    type: 'paragraph',
    children: [{ text: `What's in your mind?` }],
  },
];

const getSavedContent = (): Node[] | undefined => {
  const content = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
  return content && JSON.parse(content);
};
const getValue = (props?: IRichTextEditorProps) => {
  if (props?.disabled) {
    return props.placeholder || DEFAULT_INPUT;
  }
  if (typeof props?.value !== 'undefined') {
    return props.value;
  }
  return getSavedContent() || props?.placeholder || DEFAULT_INPUT;
};

export function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  const { onChange, value: _value, readOnly, className, disabled } = props;
  const value = getValue(props);
  const handleRTEChange = React.useCallback(
    (newValue: Node[]) => {
      if (newValue === _value) {
        return;
      }
      onChange?.(newValue);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
    },
    [onChange, _value],
  );
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const richTextEditorContext = React.useMemo(() => ({ disabled }), [disabled]);

  return (
    <RichTextEditorContext.Provider value={richTextEditorContext}>
      <Slate editor={editor} value={value} onChange={handleRTEChange}>
        <section className={clsx(disabled && 'cursor-not-allowed')}>
          {!readOnly && (
            <Toolbar>
              <MarkButton format="bold" icon="bold" />
              <MarkButton format="italic" icon="italic" />
              <MarkButton format="underline" icon="underline" />
            </Toolbar>
          )}
          <Editable
            readOnly={readOnly}
            className={clsx(
              'rounded-sm bg-gray-50 border border-transparent focus:border-gray-400',
              disabled && 'bg-gray-200 text-text-placeholder pointer-events-none',
              !readOnly && 'pb-2 px-2',
              className,
            )}
            style={{
              ...(!readOnly && {
                resize: 'vertical',
                overflowY: 'auto',
                minHeight: '4em',
              }),
            }}
            renderElement={Element}
            renderLeaf={Leaf}
            // onDOMBeforeInput={(event: Event): void => {
            //   switch ((event as InputEvent).inputType) {
            //     case 'formatBold':
            //       return CustomEditor.toggleFormat(editor, 'bold');
            //     case 'formatItalic':
            //       return CustomEditor.toggleFormat(editor, 'italic');
            //     case 'formatUnderline':
            //       return CustomEditor.toggleFormat(editor, 'underline');
            //   }
            // }}
          />
        </section>
      </Slate>
    </RichTextEditorContext.Provider>
  );
}
