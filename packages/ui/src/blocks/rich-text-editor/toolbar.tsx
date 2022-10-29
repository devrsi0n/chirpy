import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import * as React from 'react';

import { Divider } from '../../components/divider';
import { IconImage, IconLink2 } from '../../components/icons';
import { MarkButton, BlockButton } from './format-buttons';
import { RTEPopoverButton } from './rte-popover-button';

export type ToolbarProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    editor: Editor;
  }
>;

export function Toolbar({
  editor,
  children,
  className,
  ...divProps
}: ToolbarProps): JSX.Element {
  return (
    <div
      className={clsx(
        `rounded-b border-t border-gray-500 px-1 py-2 leading-none`,
        className,
      )}
      {...divProps}
    >
      <div className="flex flex-row items-center space-x-1">
        <MarkButton editor={editor} format="bold" />
        <MarkButton editor={editor} format="italic" />
        <MarkButton editor={editor} format="underline" />
        <MarkButton editor={editor} format="code" />
        <div className="hidden flex-row space-x-1 xs:flex">
          <Divider vertical />
          <RTEPopoverButton
            label="Image url"
            onClickGo={(url: string) => {
              if (!url) return;
              editor.chain().focus().setImage({ src: url }).run();
            }}
          >
            <IconImage size={20} />
          </RTEPopoverButton>
          <RTEPopoverButton
            label="URL"
            onClickGo={(url: string) => {
              if (!url) return;
              editor.chain().focus().toggleLink({ href: url }).run();
            }}
          >
            <IconLink2 size={20} />
          </RTEPopoverButton>
          <BlockButton editor={editor} format="bulletList" />
          <BlockButton editor={editor} format="blockquote" />
        </div>
      </div>
      {children}
    </div>
  );
}
