import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { useIsUnmounting } from '$/hooks/use-is-unmounting';
import { useLocalStorage } from '$/hooks/use-local-storage';
import { cardBg, textInput } from '$/styles/common';

import { MainButton } from './main-button';
import { Toolbar } from './toolbar';
import { RTEValue } from './type';

interface IBaseProps {
  onSubmit?: (value: RTEValue) => Promise<void>;
  styles?: {
    root?: TwStyle;
    editable?: TwStyle;
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
        emptyEditorClass: 'placeholder',
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
    <section css={[styles?.root, !readOnly && tw`border border-gray-500 rounded`]}>
      <EditorContent
        editor={editor}
        role="textbox"
        aria-label={isReply ? 'Reply editor' : 'Comment editor'}
        tw="text-gray-1200 max-w-full! [.placeholder:first-child::before]:(content-[attr(data-placeholder)] text-gray-1000 float-left pointer-events-none h-0)"
        className="prose"
        css={[
          !readOnly && [
            tw`min-height[4em]! resize-y overflow-hidden px-2 rounded`,
            textInput,
            cardBg,
          ],
          styles?.editable,
        ]}
      />
      {!readOnly && editor && (
        <Toolbar tw="flex flex-row justify-between" editor={editor}>
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
