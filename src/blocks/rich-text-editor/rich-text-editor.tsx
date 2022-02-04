// @refresh reset
import Loader from '@geist-ui/react-icons/loader';
import Send from '@geist-ui/react-icons/send';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { Button } from '$/components/button';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useIsUnmounting } from '$/hooks/use-is-unmounting';
import { useLocalStorage } from '$/hooks/use-local-storage';
import { useRegisterNotification } from '$/hooks/use-register-notification';
import { cardBg, textInput } from '$/styles/common';

import { SignInButton } from '../sign-in-button';
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

  const { isSignIn } = useCurrentUser();
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
      editor?.commands.setContent(initialValue);
    }
  }, [initialValue, editor]);

  const [isLoading, setIsLoading] = React.useState(false);
  const isUnmountingRef = useIsUnmounting();
  const { registerNotification } = useRegisterNotification();
  const handleSubmitReply = async () => {
    await registerNotification();
    setIsLoading(true);
    await onSubmit?.(value);
    if (isUnmountingRef.current) {
      return;
    }
    setIsLoading(false);
    remove();
    editor?.commands.clearContent();
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
          <div tw="flex flex-row justify-end space-x-2">
            {isReply && (
              <Button variant="text" size="sm" onClick={onClickDismiss}>
                Cancel
              </Button>
            )}
            {isSignIn ? (
              <Button
                size="sm"
                variant="solid"
                color="primary"
                disabled={isLoading}
                onClick={handleSubmitReply}
                aria-label={isLoading ? 'Posting' : 'Post'}
              >
                {isLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Send size="14" />}
                <span>{'Post'}</span>
              </Button>
            ) : (
              <SignInButton size="sm" />
            )}
          </div>
        </Toolbar>
      )}
    </section>
  );
}
