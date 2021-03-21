// @refresh reset
import Lock from '@geist-ui/react-icons/lock';
import Send from '@geist-ui/react-icons/send';
import DismissIcon from '@geist-ui/react-icons/x';
import '@tailwindcss/typography/dist/typography.min.css';
import * as React from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import tw, { css, TwStyle } from 'twin.macro';

import { Button } from '$/components/Button';
import { ClientOnly } from '$/components/ClientOnly';
import { SpinnerIcon } from '$/components/Icons';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { useIsUnmountingRef } from '$/hooks/useIsUnmountingRef';

import { Element } from './Element';
import { BaseFormatButton, MarkButton } from './FormatButton';
import { Leaf } from './Leaf';
import { RichTextEditorContext } from './RichTextEditorContext';
import { Toolbar } from './Toolbar';

export type RTEValue = Node[];

interface IBaseProps {
  onSubmit?: (value: RTEValue) => Promise<void>;
  styles?: {
    root?: TwStyle;
    editable?: TwStyle;
  };
  readOnly?: boolean;
  /**
   * @default 'submit'
   */
  postButtonLabel?: string;

  showDismissButton?: boolean;
  onClickDismiss?: () => void;
}

export interface IRichTextEditorProps extends IBaseProps {
  disabled?: boolean;
  initialValue?: RTEValue;
}

const STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_NAME}RTEContent`;

const DEFAULT_INPUT = [
  {
    type: 'paragraph',
    children: [{ text: `What's in your mind?` }],
  },
];

const getSavedContent = (): RTEValue | undefined => {
  const content = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
  return content && JSON.parse(content);
};
const getValue = (props?: IRichTextEditorProps) => {
  if (props?.disabled) {
    return props.initialValue || DEFAULT_INPUT;
  }
  return props?.initialValue || getSavedContent() || DEFAULT_INPUT;
};

export default function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  const {
    onSubmit,
    readOnly,
    styles,
    disabled,
    postButtonLabel,
    showDismissButton,
    onClickDismiss,
  } = props;
  const [value, setValue] = React.useState<RTEValue>(() => getValue(props));
  const handleRTEChange = (newValue: RTEValue) => {
    if (newValue === value) {
      return;
    }
    setValue(newValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
  };

  const { isLogin } = useCurrentUser();
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const richTextEditorContext = React.useMemo(() => ({ disabled }), [disabled]);
  const [isLoading, setIsLoading] = React.useState(false);
  const isUnmountingRef = useIsUnmountingRef();
  const handleSubmitReply = async () => {
    setIsLoading(true);
    await onSubmit?.(value);
    // Skip setState if this component is unmounting
    if (isUnmountingRef.current) {
      return;
    }
    setIsLoading(false);

    // Transforms.deselect(editor);
    Transforms.select(editor, [0]);
    setValue(DEFAULT_INPUT);
  };

  return (
    // Only render editor on client because we relay on localStorage
    <ClientOnly>
      <RichTextEditorContext.Provider value={richTextEditorContext}>
        <Slate editor={editor} value={value} onChange={handleRTEChange}>
          <section css={[tw`space-y-2`, disabled && tw`cursor-not-allowed`, styles?.root]}>
            {!readOnly && (
              <Toolbar tw="flex flex-row justify-between">
                <div>
                  <MarkButton format="bold" icon="bold" />
                  <MarkButton format="italic" icon="italic" />
                  <MarkButton format="underline" icon="underline" />
                </div>
                {showDismissButton && (
                  <div>
                    <BaseFormatButton onClick={onClickDismiss}>
                      <DismissIcon size={20} />
                    </BaseFormatButton>
                  </div>
                )}
              </Toolbar>
            )}
            <Editable
              readOnly={readOnly}
              //
              className="prose dark:prose-light"
              css={[
                tw`rounded border focus:border-gray-600 dark:focus:border-gray-300 dark:text-gray-300`,
                disabled && tw`bg-gray-200 text-gray-400 pointer-events-none`,
                !readOnly
                  ? tw`shadow-sm p-2 border-gray-200 dark:border-gray-700`
                  : tw`border-transparent`,
                styles?.editable,
              ]}
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
            {!readOnly && (
              <div tw="flex flex-row justify-end">
                <Button
                  color="purple"
                  variant="solid"
                  css={css([tw`space-x-1`, isLoading && tw`cursor-not-allowed`])}
                  onClick={handleSubmitReply}
                >
                  {isLoading ? (
                    <SpinnerIcon tw="text-gray-400" />
                  ) : !isLogin ? (
                    <Lock size="14" />
                  ) : (
                    <Send size="14" />
                  )}
                  <Text>{postButtonLabel || 'Post'}</Text>
                </Button>
              </div>
            )}
          </section>
        </Slate>
      </RichTextEditorContext.Provider>
    </ClientOnly>
  );
}
