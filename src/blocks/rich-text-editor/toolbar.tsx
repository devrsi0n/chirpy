import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import * as React from 'react';

import { Divider } from '$/components/divider';
import { cardBg } from '$/styles/common';

import { MarkButton, HeadingButton, BlockButton } from './format-buttons';

export type ToolbarProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    editor: Editor;
  }
>;

export function Toolbar({ editor, children, className, ...divProps }: ToolbarProps): JSX.Element {
  return (
    <div
      className={clsx(
        `px-1 py-2 leading-none border-t border-gray-500 rounded-b`,
        cardBg,
        className,
      )}
      {...divProps}
    >
      <div className="space-x-1 flex flex-row items-center">
        <div className="hidden xs:flex xs:flex-row xs:space-x-1">
          <HeadingButton editor={editor} />
          <Divider vertical />
        </div>
        <MarkButton editor={editor} format="bold" />
        <MarkButton editor={editor} format="italic" />
        <MarkButton editor={editor} format="underline" />
        <MarkButton editor={editor} format="code" />
        <div className="hidden sm:flex sm:flex-row sm:space-x-1">
          <Divider vertical />
          <BlockButton editor={editor} format="link" />
          <BlockButton editor={editor} format="bulletList" />
          <BlockButton editor={editor} format="blockquote" />
        </div>
      </div>
      {children}
    </div>
  );
}
