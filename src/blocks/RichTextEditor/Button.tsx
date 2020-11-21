import * as React from 'react';
import { useSlate } from 'slate-react';
import { BoldIcon } from '$/components/Icons/Bold.Icon';
import { ItalicIcon } from '$/components/Icons/Italic.Icon';
import Underline from '@geist-ui/react-icons/underline';
import { Format, Icon } from './type';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utilities';
import { useRichTextEditorContext } from './RichTextEditorContext';
import clsx from 'clsx';

type BaseButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<'button'>;

export function Button({
  className,
  isActive,
  children,
  ...restProps
}: BaseButtonProps): JSX.Element {
  const { disabled } = useRichTextEditorContext();
  return (
    <button
      type="button"
      {...restProps}
      className={clsx(
        disabled && 'pointer-events-none hover:cursor-not-allowed',
        isActive ? 'text-gray-900' : 'text-gray-400',
        className,
      )}
    >
      {children}
    </button>
  );
}

const iconMap = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: Underline,
};

export type ButtonProps = {
  format: Format;
  icon: Icon;
};

export function BlockButton({ format, icon }: ButtonProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <Button
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon />
    </Button>
  );
}

export function MarkButton({ format, icon }: ButtonProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <Button
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon />
    </Button>
  );
}
