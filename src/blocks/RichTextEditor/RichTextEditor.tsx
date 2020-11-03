// @refresh reset
import * as React from 'react';
import { createEditor, Editor, Node, Range } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
  ReactEditor,
} from 'slate-react';

import { Code } from '$/components/Code';
import { Text as TextElement } from '$/components/Text';
import { CustomEditor } from './utilities';
import ReactDOM from 'react-dom';
import { Button } from '$/components/Button';
import clsx from 'clsx';
import { BoldIcon } from '$/components/Icons/Bold.Icon';
import { ItalicIcon } from '$/components/Icons/Italic.Icon';

export type RichTextEditorProps = React.PropsWithChildren<{
  // Empty
}>;

const STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_NAME}RTEContent`;

const INIT_INPUT = [
  {
    type: 'paragraph',
    children: [{ text: `What's in your mind?` }],
  },
];

const getSavedContent = (): Node[] | undefined => {
  const content = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
  return content && JSON.parse(content);
};

export function RichTextEditor(props: RichTextEditorProps): JSX.Element {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState<Node[]>(getSavedContent() || INIT_INPUT);
  const handleRTEChange = React.useCallback((newValue: Node[]) => {
    setValue(newValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
  }, []);
  return (
    <Slate editor={editor} value={value} onChange={handleRTEChange}>
      <Editable
        className="border p-2 m-1"
        style={{
          resize: 'vertical',
          overflowY: 'auto',
          minHeight: '4em',
        }}
        renderElement={RenderElement}
        renderLeaf={Leaf}
        onDOMBeforeInput={(event: Event): void => {
          event.preventDefault();
          switch ((event as InputEvent).inputType) {
            case 'formatBold':
              return CustomEditor.toggleFormat(editor, 'bold');
            case 'formatItalic':
              return CustomEditor.toggleFormat(editor, 'italic');
            case 'formatUnderline':
              return CustomEditor.toggleFormat(editor, 'underline');
          }
        }}
      />
      <HoveringToolbar />
    </Slate>
  );
}

function RenderElement(props: RenderElementProps) {
  switch (props.element.type) {
    case 'code':
      return <Code {...props} />;
    default:
      return <TextElement {...props} />;
  }
}

function Leaf({ attributes, children, leaf }: RenderLeafProps): JSX.Element {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

const HoveringToolbar = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useSlate();

  React.useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      // el.removeAttribute('style');
      el.style.top = '-10000px';
      el.style.left = '-10000px';
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) {
      return;
    }
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <div
        id="test"
        ref={ref}
        style={{
          padding: '8px 7px 6px',
          position: 'absolute',
          zIndex: 1,
          top: '-10000px',
          left: '-10000px',
          marginTop: '-6px',
          opacity: '0',
          backgroundColor: '#222',
          borderRadius: '4px',
          transition: 'opacity 0.75s',
        }}
      >
        <FormatButton format="bold" icon="bold" className="text-background" />
        <FormatButton format="italic" icon="italic" className="text-background" />
        {/* <FormatButton format="underlined" icon="format_underlined" /> */}
      </div>
    </Portal>
  );
};

type Icon = 'bold' | 'italic';
type Format = 'bold' | 'italic';

const iconMap = {
  bold: BoldIcon,
  italic: ItalicIcon,
};

type FormatButtonProps = {
  format: Format;
  icon: Icon;
} & React.ComponentProps<'button'>;

const FormatButton = ({ format, icon, ...restProps }: FormatButtonProps) => {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <button
      // reversed
      // active={CustomEditor.isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleFormat(editor, format);
      }}
      {...restProps}
    >
      <Icon />
    </button>
  );
};

export const Portal = ({ children }: { children: React.ReactNode }): JSX.Element => {
  if (typeof window === 'undefined') {
    return <></>;
  }
  return ReactDOM.createPortal(children, window.document.body);
};
