// @refresh reset
import Loader from '@geist-ui/react-icons/loader';
import Send from '@geist-ui/react-icons/send';
import DismissIcon from '@geist-ui/react-icons/x';
import * as React from 'react';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import tw, { css, TwStyle } from 'twin.macro';

import { Button } from '$/components/Button';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { useIsUnmountingRef } from '$/hooks/useIsUnmountingRef';
import { usePrevious } from '$/hooks/usePrevious';
import { APP_NAME_LOWERCASE } from '$/lib/constants';

import { SignInButton } from '../SignInButton';
import { Element } from './Element';
import { BaseFormatButton, MarkButton } from './FormatButton';
import { Leaf } from './Leaf';
import { RichTextEditorContext } from './RichTextEditorContext';
import { Toolbar } from './Toolbar';
import { EMPTY_INPUT } from './config';
import { RTEValue } from './type';

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
  placeholder?: string;
}

export default function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  const {
    onSubmit,
    readOnly,
    styles,
    disabled,
    postButtonLabel,
    showDismissButton,
    onClickDismiss,
    placeholder,
  } = props;
  const [value, setValue] = useRTEValue(props);
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
    if (isUnmountingRef.current) {
      return;
    }
    setIsLoading(false);
    // Transforms.deselect(editor);
    Transforms.select(editor, [0]);
    setValue(EMPTY_INPUT);
  };

  return (
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
            placeholder={placeholder}
            css={[
              tw`rounded border dark:text-gray-300`,
              disabled && tw`bg-gray-200 text-gray-400 pointer-events-none`,
              !readOnly
                ? tw`min-height[4em]! resize-y overflow-hidden shadow-sm focus:shadow-lg p-2 border-gray-200 dark:border-gray-700`
                : tw`border-transparent`,
              styles?.editable,
            ]}
            renderElement={Element}
            renderLeaf={Leaf}
          />
          {!readOnly && (
            <div tw="flex flex-row justify-end">
              {isLogin ? (
                <Button
                  color="primary"
                  variant={'solid'}
                  css={css([tw`space-x-1`, isLoading && tw`cursor-not-allowed`])}
                  onClick={handleSubmitReply}
                  aria-label={isLoading ? 'Posting' : 'Post'}
                >
                  {isLoading ? (
                    <Loader tw="animate-spin text-gray-400 w-5 h-5" />
                  ) : (
                    <Send size="14" />
                  )}
                  <Text>{postButtonLabel || 'Post'}</Text>
                </Button>
              ) : (
                <SignInButton variant="plain" />
              )}
            </div>
          )}
        </section>
      </Slate>
    </RichTextEditorContext.Provider>
  );
}

const STORAGE_KEY = `${APP_NAME_LOWERCASE}.rte`;

const getSavedContent = (): RTEValue | undefined => {
  const content = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
  return content && JSON.parse(content);
};

const useRTEValue = (
  props: IRichTextEditorProps,
): [RTEValue, React.Dispatch<React.SetStateAction<RTEValue>>] => {
  const [value, setValue] = React.useState<RTEValue>(() => getValue(props));
  const prevValue = usePrevious(value);
  React.useEffect(() => {
    if (props.initialValue && prevValue !== props.initialValue) {
      setValue(props.initialValue);
    }
  }, [props.initialValue, prevValue]);

  return [value, setValue];
};

const getValue = (props?: IRichTextEditorProps): RTEValue => {
  if (props?.disabled) {
    return props.initialValue || EMPTY_INPUT;
  }
  return props?.initialValue || getSavedContent() || EMPTY_INPUT;
};
