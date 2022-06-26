import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import * as React from 'react';

import { Divider } from '$/components/divider';
import { cardBg } from '$/styles/common';

import { MarkButton, HeadingButton, BlockButton } from './format-buttons';
import styles from './toolbar.module.scss';

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
        cardBg,
        className,
      )}
      {...divProps}
    >
      <div className="flex flex-row items-center space-x-1">
        <div className={styles.headingButtonGroup}>
          <HeadingButton editor={editor} />
          <Divider vertical />
        </div>
        <MarkButton editor={editor} format="bold" />
        <MarkButton editor={editor} format="italic" />
        <MarkButton editor={editor} format="underline" />
        <MarkButton editor={editor} format="code" />
        <div className={styles.blockButtonGroup}>
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
