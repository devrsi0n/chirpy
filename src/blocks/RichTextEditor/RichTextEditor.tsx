// @refresh reset
import * as React from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import clsx from 'clsx';
import DismissIcon from '@geist-ui/react-icons/x';

import { Leaf } from './Leaf';
import { Element } from './Element';
import { RichTextEditorContext } from './RichTextEditorContext';
import { Button } from '$/components/Button';
import { Toolbar } from './Toolbar';
import { BaseFormatButton, MarkButton } from './FormatButton';
import { ClientOnly } from '$/components/ClientOnly';
import { useIsUnmountingRef } from '$/hooks/useIsUnmountingRef';
import { SpinnerIcon } from '$/components/Icons';

export type RTEValue = Node[];

interface IBaseProps {
  onSubmit?: (value: RTEValue) => Promise<void>;
  styles?: {
    root?: string;
    editable?: string;
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
          <section className={clsx('space-y-2', disabled && 'cursor-not-allowed', styles?.root)}>
            {!readOnly && (
              <Toolbar className="flex flex-row justify-between">
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
              className={clsx(
                'prose rounded border border-transparent focus:border-gray-600',
                disabled && 'bg-gray-200 text-text-placeholder pointer-events-none',
                !readOnly && ' shadow-sm pb-2 px-2 border-gray-200',
                styles?.editable,
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
            {!readOnly && (
              <div className="flex flex-row justify-end">
                <Button
                  color="purple"
                  variant="solid"
                  className={clsx('space-x-1', isLoading ? 'cursor-not-allowed' : '')}
                  onClick={handleSubmitReply}
                >
                  {isLoading && <SpinnerIcon className="text-gray-400" />}
                  <span>{postButtonLabel || 'Post'}</span>
                </Button>
              </div>
            )}
          </section>
        </Slate>
      </RichTextEditorContext.Provider>
    </ClientOnly>
  );
}
