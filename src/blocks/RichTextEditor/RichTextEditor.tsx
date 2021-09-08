// @refresh reset
import Loader from '@geist-ui/react-icons/loader';
import Send from '@geist-ui/react-icons/send';
import * as React from 'react';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import tw, { TwStyle } from 'twin.macro';

import { Button } from '$/components/Button';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { useIsUnmountingRef } from '$/hooks/useIsUnmountingRef';
import { usePrevious } from '$/hooks/usePrevious';
import { APP_NAME_LOWERCASE } from '$/lib/constants';

import { SignInButton } from '../SignInButton';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { MarkButton } from './RTEButtons';
import { RichTextEditorContextProvider } from './RichTextEditorContext';
import { Toolbar } from './Toolbar';
import { EMPTY_INPUT } from './config';
import { RTEValue } from './type';
import { isValueEmpty } from './utilities';

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

export default function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  const { onSubmit, readOnly, styles, isReply, onClickDismiss, placeholder } = props;
  const [value, setValue] = useRTEValue(props);
  const handleRTEChange = (newValue: RTEValue) => {
    if (newValue === value) {
      return;
    }
    setValue(newValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
  };

  const { isSignIn } = useCurrentUser();
  const editor = React.useMemo(() => withReact(createEditor()), []);

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
    <RichTextEditorContextProvider readOnly={readOnly}>
      <Slate editor={editor} value={value} onChange={handleRTEChange}>
        <section
          css={[
            styles?.root,
            !readOnly &&
              tw`focus-within:border-gray-400 border border-gray-200 dark:border-gray-700 rounded`,
          ]}
        >
          <Editable
            readOnly={readOnly}
            placeholder={placeholder}
            css={[
              tw`dark:text-gray-300`,
              !readOnly && tw`min-height[4em]! resize-y overflow-hidden px-2 pt-2 bg-white rounded`,
              styles?.editable,
            ]}
            renderElement={Element}
            renderLeaf={Leaf}
          />
          {!readOnly && (
            <Toolbar tw="flex flex-row justify-between">
              <div tw="space-x-1">
                <MarkButton format="bold" icon="bold" />
                <MarkButton format="italic" icon="italic" />
                <MarkButton format="underline" icon="underline" />
              </div>

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
                    disabled={isValueEmpty(value) || isLoading}
                    onClick={handleSubmitReply}
                    aria-label={isLoading ? 'Posting' : 'Post'}
                  >
                    {isLoading ? (
                      <Loader tw="animate-spin text-gray-400 w-5 h-5" />
                    ) : (
                      <Send size="14" />
                    )}
                    <Text>{'Post'}</Text>
                  </Button>
                ) : (
                  <SignInButton variant="plain" size="sm" />
                )}
              </div>
            </Toolbar>
          )}
        </section>
      </Slate>
    </RichTextEditorContextProvider>
  );
}

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
  if (props?.readOnly) {
    return props.initialValue || EMPTY_INPUT;
  }
  return props?.initialValue || getSavedContent() || EMPTY_INPUT;
};

const STORAGE_KEY = `${APP_NAME_LOWERCASE}.rte`;

const getSavedContent = (): RTEValue | undefined => {
  const content = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
  return content && JSON.parse(content);
};
