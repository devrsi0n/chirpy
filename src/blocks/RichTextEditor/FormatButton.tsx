import * as React from 'react';
import clsx from 'clsx';
import { useSlate } from 'slate-react';
import UnderlineIcon from '@geist-ui/react-icons/underline';
import BoldIcon from '@geist-ui/react-icons/bold';
import ItalicIcon from '@geist-ui/react-icons/italic';

import { Format, Icon } from './type';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utilities';
import { useRichTextEditorContext } from './RichTextEditorContext';

type BaseButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<'button'>;

/**
 * TODO: Replace this button with components/Button
 * @param param0
 */
export function BaseFormatButton({
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
        'p-1',
        disabled ? 'pointer-events-none hover:cursor-not-allowed' : 'hover:bg-gray-100',
        isActive ? 'text-blue-600' : 'text-gray-600',
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
  underline: UnderlineIcon,
};

export type ButtonProps = {
  format: Format;
  icon: Icon;
};

export function BlockButton({ format, icon }: ButtonProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <BaseFormatButton
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon />
    </BaseFormatButton>
  );
}

export function MarkButton({ format, icon }: ButtonProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <BaseFormatButton
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon size={20} />
    </BaseFormatButton>
  );
}
