import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import * as React from 'react';

import { BaseButtonProps, BaseButton } from '$/components/button';
import {
  IconBold,
  IconCode,
  IconBlockQuote,
  IconItalic,
  IconLink2,
  IconList,
  IconUnderline,
  Icon,
} from '$/components/icons';
import { Select } from '$/components/select';
import { listHoverableColor } from '$/styles/common';

type InlineFormat = 'bold' | 'italic' | 'underline' | 'code';

export type BaseRTEButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & BaseButtonProps;

export function BaseMarkButton({
  className,
  isActive,
  children,
  ...restProps
}: BaseRTEButtonProps): JSX.Element {
  return (
    <BaseButton
      className={clsx(
        `rounded p-1.5 text-gray-1100`,
        listHoverableColor,
        isActive && `bg-primary-300 text-primary-1000`,
        className,
      )}
      {...restProps}
    >
      {children}
    </BaseButton>
  );
}

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

type BlockButtonFormat = 'bulletList' | 'link' | 'blockquote';
export type BlockButtonProps = {
  format: BlockButtonFormat;
  editor: Editor;
};

const blockMap: Record<BlockButtonFormat, [Icon, string]> = {
  bulletList: [IconList, 'toggleBulletList'],
  link: [IconLink2, 'toggleLink'],
  blockquote: [IconBlockQuote, 'toggleBlockquote'],
};

export function BlockButton({ format, editor }: BlockButtonProps): JSX.Element {
  const [Icon, methodName] = blockMap[format];
  return (
    <BaseMarkButton
      isActive={editor.isActive(format)}
      onClick={() => {
        const instance = editor.chain().focus();
        if (format === 'link') {
          const url = window.prompt('Enter the URL of the link:');
          if (!url) return;
          instance.toggleLink({ href: url }).run();
          return;
        }
        instance[methodName as 'toggleBulletList']().run();
      }}
    >
      <Icon size={20} />
    </BaseMarkButton>
  );
}

const headingList = [
  'Paragraph',
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6',
];

type HeadingButtonProps = {
  editor: Editor;
};

type HeadingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function HeadingButton({ editor }: HeadingButtonProps): JSX.Element {
  const handleChange = (value: HeadingValue) => {
    const instance = editor.chain().focus();
    if (value === 0) {
      instance.setParagraph().run();
    } else {
      instance.toggleHeading({ level: value }).run();
    }
  };
  const value = getActiveBlockFormat(editor) || 0;
  return (
    <Select<HeadingValue>
      value={value}
      name={headingList[value]}
      onChange={handleChange}
      className="w-36"
      variant="borderless"
    >
      {headingList.map((item, index) => (
        <Select.Option value={index} key={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
}

function getActiveBlockFormat(editor: Editor): HeadingValue | undefined {
  for (const index of Object.keys(headingList)) {
    const level = +index as HeadingValue;
    const isActive =
      level === 0
        ? editor.isActive('paragraph')
        : editor.isActive('heading', { level });
    if (isActive) return level;
  }
}
