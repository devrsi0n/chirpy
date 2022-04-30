import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import * as React from 'react';

import { useIsUnmounting } from '$/hooks/use-is-unmounting';
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
  const { onSubmit, readOnly, styles, isReply, onClickDismiss, placeholder, initialValue } = props;
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

  const [isLoading, setIsLoading] = React.useState(false);
  const isUnmountingRef = useIsUnmounting();

  const handleSubmitReply = async () => {
    setIsLoading(true);
    await onSubmit?.(value);
    if (isUnmountingRef.current) {
      return;
    }
    setIsLoading(false);
    remove();
    editor?.commands?.clearContent();
  };

  return (
    <section className={clsx(styles?.root, !readOnly && `border border-gray-500 rounded`)}>
      <EditorContent
        editor={editor}
        role="textbox"
        aria-label={isReply ? 'Reply editor' : 'Comment editor'}
        className={clsx(
          'prose text-gray-1200 !max-w-full',
          !readOnly && [`!min-h-[4em] resize-y overflow-hidden px-2 rounded`, textInput, cardBg],
          styles?.editable,
        )}
      />
      {!readOnly && editor && (
        <Toolbar className="flex flex-row justify-between" editor={editor}>
          <MainButton
            disabled={editor.isEmpty}
            isLoading={isLoading}
            isReply={isReply}
            onClickSubmit={handleSubmitReply}
            onClickDismiss={onClickDismiss}
          />
        </Toolbar>
      )}
    </section>
  );
}
