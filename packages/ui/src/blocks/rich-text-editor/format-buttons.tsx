import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import * as React from 'react';

import { BaseButton, BaseButtonProps } from '../../components/button';
import {
  Icon,
  IconBlockQuote,
  IconBold,
  IconCode,
  IconItalic,
  IconList,
  IconUnderline,
} from '../../components/icons';
import { listHoverableColor } from '../../styles/common';

type InlineFormat = 'bold' | 'italic' | 'underline' | 'code';

export type BaseRTEButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & BaseButtonProps;

export const BaseMarkButton = React.forwardRef(function BaseMarkButton(
  { className, isActive, children, ...restProps }: BaseRTEButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
): JSX.Element {
  return (
    <BaseButton
      className={clsx(
        `rounded p-1.5 text-gray-1100`,
        listHoverableColor,
        isActive && `bg-primary-300 text-primary-1000`,
        className,
      )}
      {...restProps}
      ref={ref}
    >
      {children}
    </BaseButton>
  );
});

const markIconMap: Record<InlineFormat, Icon> = {
  bold: IconBold,
  italic: IconItalic,
  underline: IconUnderline,
  code: IconCode,
};

export type MarkButtonProps = {
  format: InlineFormat;
  editor: Editor;
};

export function MarkButton({ format, editor }: MarkButtonProps): JSX.Element {
  const Icon = markIconMap[format];
  return (
    <BaseMarkButton
      isActive={editor.isActive(format)}
      onClick={() => {
        editor.chain().focus().toggleMark(format).run();
      }}
    >
      <Icon size={20} />
    </BaseMarkButton>
  );
}

type BlockButtonFormat = 'bulletList' | 'blockquote';
export type BlockButtonProps = {
  format: BlockButtonFormat;
  editor: Editor;
};

const blockMap: Record<BlockButtonFormat, [Icon, string]> = {
  bulletList: [IconList, 'toggleBulletList'],
  blockquote: [IconBlockQuote, 'toggleBlockquote'],
};

export function BlockButton({ format, editor }: BlockButtonProps): JSX.Element {
  const [Icon, methodName] = blockMap[format];
  return (
    <BaseMarkButton
      isActive={editor.isActive(format)}
      onClick={() => {
        editor.chain().focus()[methodName as 'toggleBulletList']().run();
      }}
    >
      <Icon size={20} />
    </BaseMarkButton>
  );
}
