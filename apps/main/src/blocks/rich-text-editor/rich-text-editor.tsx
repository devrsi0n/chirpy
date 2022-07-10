import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import * as React from 'react';

import { useLocalStorage } from '$/hooks/use-local-storage';
import { cardBg, textInput } from '$/styles/common';

import { MainButton } from './main-button';
import { Toolbar } from './toolbar';
import { RTEValue } from './type';

interface IBaseProps {
  onSubmit?: (value: RTEValue) => Promise<void>;
  styles?: {
    root?: string;
    editable?: string;
  };
  readOnly?: boolean;
  isReply?: boolean;
  onClickDismiss?: () => void;
}

export interface IRichTextEditorProps extends IBaseProps {
  initialValue?: RTEValue;
  placeholder?: string;
}

export function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  const {
    onSubmit,
    readOnly,
    styles,
    isReply,
    onClickDismiss,
    placeholder,
    initialValue,
  } = props;
  const [value, setValue, remove] = useLocalStorage(initialValue, 'rte-value');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        HTMLAttributes: {
          target: '_blank',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'rtePlaceholder',
      }),
      Image,
    ],
    editable: !readOnly,
    content: initialValue || value,
    onUpdate({ editor }) {
      const newVal = editor?.getJSON() || {};
      setValue(newVal);
    },
  });
  React.useEffect(() => {
    if (initialValue) {
      editor?.commands?.setContent(initialValue);
    }
  }, [initialValue, editor]);

  const handleSubmitReply = async () => {
    await onSubmit?.(value);
    remove();
    editor?.commands?.clearContent();
  };

  return (
    <section
      className={clsx(
        styles?.root,
        !readOnly && `rounded border border-gray-500`,
      )}
    >
      <EditorContent
        editor={editor}
        role="textbox"
        aria-label={isReply ? 'Reply editor' : 'Comment editor'}
        className={clsx(
          'prose !max-w-full text-gray-1200',
          !readOnly && [
            `!min-h-[4em] resize-y overflow-hidden rounded px-2`,
            textInput,
            cardBg,
          ],
          styles?.editable,
        )}
      />
      {!readOnly && editor && (
        <Toolbar className="flex flex-row justify-between" editor={editor}>
          <MainButton
            rteValue={value}
            disabled={editor.isEmpty}
            isReply={isReply}
            onClickSubmit={handleSubmitReply}
            onClickDismiss={onClickDismiss}
          />
        </Toolbar>
      )}
    </section>
  );
}
