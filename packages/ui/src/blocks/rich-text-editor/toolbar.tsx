import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import * as React from 'react';

import { Divider } from '../../components/divider';
import {
  IconBlockQuote,
  IconImage,
  IconLink2,
  IconList,
  IconMoreVertical,
} from '../../components/icons';
import { Menu } from '../../components/menu';
import { BlockButton, MarkButton } from './format-buttons';
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
        `rounded-b border-x border-b border-gray-500 px-1 py-2 leading-none`,
        className,
      )}
      {...divProps}
    >
      <div className="flex flex-row items-center gap-1">
        <MarkButton editor={editor} format="bold" />
        <MarkButton editor={editor} format="italic" />
        <MarkButton editor={editor} format="underline" />
        <MarkButton editor={editor} format="code" />
        <div className="hidden flex-row items-center gap-1 [@media(min-width:470px)]:flex">
          <Divider vertical />
          <BlockButton editor={editor} format="bulletList" />
          <BlockButton editor={editor} format="blockquote" />
          <RTEPopoverButton
            label="URL"
            onClickGo={(url: string) => {
              if (!url) return;
              editor.chain().focus().toggleLink({ href: url }).run();
            }}
          >
            <IconLink2 size={20} />
          </RTEPopoverButton>
          <RTEPopoverButton
            label="Image url"
            onClickGo={(url: string) => {
              if (!url) return;
              editor.chain().focus().setImage({ src: url }).run();
            }}
          >
            <IconImage size={20} />
          </RTEPopoverButton>
        </div>
        <div className="flex flex-row items-center [@media(min-width:470px)]:hidden">
          <Menu>
            <Menu.Button
              variant="text"
              shape="square"
              className="rounded p-1.5 text-gray-1100 hover:bg-gray-200"
            >
              <IconMoreVertical size={20} />
            </Menu.Button>
            <Menu.Items>
              <Menu.Item
                onClick={() => {
                  editor.chain().focus().toggleBulletList().run();
                }}
              >
                <IconList className="size-5" />
                Bullet list
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  editor.chain().focus().toggleBlockquote().run();
                }}
              >
                <IconBlockQuote className="size-5" />
                Blockquote
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      {children}
    </div>
  );
}
