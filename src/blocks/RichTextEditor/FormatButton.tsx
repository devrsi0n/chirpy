import BoldIcon from '@geist-ui/react-icons/bold';
import ItalicIcon from '@geist-ui/react-icons/italic';
import UnderlineIcon from '@geist-ui/react-icons/underline';
import * as React from 'react';
import { useSlate } from 'slate-react';
import 'twin.macro';
import tw from 'twin.macro';

import { BaseButton, BaseButtonProps } from '$/components/Button';

import { useRichTextEditorContext } from './RichTextEditorContext';
import { Format, Icon } from './type';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utilities';

type BaseFormatButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & BaseButtonProps;

export function BaseFormatButton({
  className,
  isActive,
  children,
  ...restProps
}: BaseFormatButtonProps): JSX.Element {
  const { disabled } = useRichTextEditorContext();
  return (
    <BaseButton
      {...restProps}
      disabled={disabled}
      css={[
        tw`p-1 rounded-sm`,
        disabled
          ? tw`pointer-events-none hover:cursor-not-allowed`
          : tw`hover:bg-gray-100 dark:hover:bg-gray-800`,
        isActive ? tw`text-gray-900 dark:text-gray-200` : tw`text-gray-600 dark:text-gray-400`,
        className,
      ]}
    >
      {children}
    </BaseButton>
  );
}

const iconMap = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
};

export type ButtonFormatProps = {
  format: Format;
  icon: Icon;
};

export function BlockButton({ format, icon }: ButtonFormatProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <BaseFormatButton
      isActive={isBlockActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon />
    </BaseFormatButton>
  );
}

export function MarkButton({ format, icon }: ButtonFormatProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <BaseFormatButton
      isActive={isMarkActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon size={20} />
    </BaseFormatButton>
  );
}
