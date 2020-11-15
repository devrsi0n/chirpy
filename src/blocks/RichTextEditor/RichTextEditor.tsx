// @refresh reset
import * as React from 'react';
import { createEditor, Editor, Node, Range } from 'slate';
import { Slate, Editable, withReact, useSlate, ReactEditor } from 'slate-react';
import clsx from 'clsx';

import { CustomEditor } from './utilities';
import { BoldIcon } from '$/components/Icons/Bold.Icon';
import { ItalicIcon } from '$/components/Icons/Italic.Icon';
import { Format } from './type';
import { Leaf } from './Leaf';
import { RenderElement } from './RenderElement';
import { RichTextEditorContext } from './RichTextEditorContext';
import { Divider } from '$/components/Divider';

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
        <section className="border m-1">
          {!readOnly && <HoveringToolbar />}
          <Editable
            className={clsx(
              'rounded-sm pb-2 px-2',
              readOnly && 'pointer-events-none select-text',
              disabled &&
                'bg-gray-200 text-text-placeholder pointer-events-none cursor-not-allowed',
              className,
            )}
            style={{
              ...(!readOnly && {
                resize: 'vertical',
                overflowY: 'auto',
                minHeight: '4em',
              }),
              ...(disabled && {
                cursor: 'not-allowed',
              }),
            }}
            renderElement={RenderElement}
            renderLeaf={Leaf}
            onDOMBeforeInput={(event: Event): void => {
              switch ((event as InputEvent).inputType) {
                case 'formatBold':
                  return CustomEditor.toggleFormat(editor, 'bold');
                case 'formatItalic':
                  return CustomEditor.toggleFormat(editor, 'italic');
                // case 'formatUnderline':
                //   return CustomEditor.toggleFormat(editor, 'underline');
              }
            }}
          />
        </section>
      </Slate>
    </RichTextEditorContext.Provider>
  );
}

const HoveringToolbar = () => {
  return (
    <div className="pt-2">
      <div className="px-2 space-x-2">
        <FormatButton format="bold" icon="bold" className="text-text" />
        <FormatButton format="italic" icon="italic" className="text-text" />
      </div>
      {/* <FormatButton format="underlined" icon="format_underlined" /> */}
      <Divider />
    </div>
  );
};

type Icon = 'bold' | 'italic';

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
