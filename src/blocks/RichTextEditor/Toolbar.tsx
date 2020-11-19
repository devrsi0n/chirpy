import * as React from 'react';
import { useSlate } from 'slate-react';

import { Divider } from '$/components/Divider';
import { BoldIcon } from '$/components/Icons/Bold.Icon';
import { ItalicIcon } from '$/components/Icons/Italic.Icon';
import { Format } from './type';
import { CustomEditor } from './utilities';
import { useRichTextEditorContext } from './RichTextEditorContext';
import clsx from 'clsx';

export type ToolbarProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function Toolbar({ className, ...divProps }: ToolbarProps): JSX.Element {
  return (
    <div className={clsx('pt-2', className)} {...divProps}>
      <div className="px-2 space-x-2">
        <FormatButton format="bold" icon="bold" className="text-text" />
        <FormatButton format="italic" icon="italic" className="text-text" />
      </div>
      {/* <FormatButton format="underlined" icon="format_underlined" /> */}
      <Divider />
    </div>
  );
}

type Icon = 'bold' | 'italic';

const iconMap = {
  bold: BoldIcon,
  italic: ItalicIcon,
};

type FormatButtonProps = {
  format: Format;
  icon: Icon;
} & React.ComponentProps<'button'>;

const FormatButton = ({ format, icon, className, ...restProps }: FormatButtonProps) => {
  const editor = useSlate();
  const { disabled } = useRichTextEditorContext();
  const Icon = iconMap[icon];
  return (
    <button
      type="button"
      className={clsx(disabled && 'pointer-events-none hover:cursor-not-allowed', className)}
      // reversed
      // active={CustomEditor.isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleFormat(editor, format);
      }}
      {...restProps}
    >
      <Icon />
    </button>
  );
};
