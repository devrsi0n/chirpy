import { Editor } from '@tiptap/react';
import * as React from 'react';
import tw from 'twin.macro';

import { Divider } from '$/components/divider';
import { cardBg } from '$/styles/common';

import { MarkButton, HeadingButton, BlockButton } from './format-buttons';

export type ToolbarProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    editor: Editor;
  }
>;

export function Toolbar({ editor, children, ...divProps }: ToolbarProps): JSX.Element {
  return (
    <div
      css={[tw`px-1 py-2 leading-none border-t border-gray-500 rounded-b`, cardBg]}
      {...divProps}
    >
      <div tw="space-x-1 flex flex-row items-center">
        <div tw="hidden xs:(flex flex-row space-x-1)">
          <HeadingButton editor={editor} />
          <Divider vertical />
        </div>
        <MarkButton editor={editor} format="bold" />
        <MarkButton editor={editor} format="italic" />
        <MarkButton editor={editor} format="underline" />
        <MarkButton editor={editor} format="code" />
        <div tw="hidden sm:(flex flex-row space-x-1)">
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
