import BoldIcon from '@geist-ui/react-icons/bold';
import CodeIcon from '@geist-ui/react-icons/code';
import ItalicIcon from '@geist-ui/react-icons/italic';
import UnderlineIcon from '@geist-ui/react-icons/underline';
import * as React from 'react';
import { useSlate } from 'slate-react';
import tw from 'twin.macro';

import { BaseButtonProps, BaseButton } from '$/components/Button';

import { useRichTextEditorContext } from './RichTextEditorContext';
import { InlineFormat, Icon } from './type';
import { isMarkActive, toggleMark } from './utilities';

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
  const { readOnly } = useRichTextEditorContext();
  return (
    <BaseButton
      css={[
        tw`p-1.5 rounded text-gray-500 hover:(bg-primary-50 text-primary-500)`,
        isActive ? tw`text-black bg-gray-100 dark:(text-gray-100 bg-gray-800)` : tw``,
        readOnly ? tw`cursor-not-allowed` : tw``,
        className,
      ]}
      {...restProps}
    >
      {children}
    </BaseButton>
  );
}

const iconMap = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
  code: CodeIcon,
};

interface IButtonFormatProps {
  icon: Icon;
}

// export interface IBlockButtonProps extends IButtonFormatProps {
//   format: BlockFormat;
// }

// export function BlockButton({ format, icon }: IBlockButtonProps): JSX.Element {
//   const editor = useSlate();
//   const Icon = iconMap[icon];
//   return (
//     <BaseFormatButton
//       isActive={isBlockActive(editor, format)}
//       onClick={(event) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     >
//       <Icon />
//     </BaseFormatButton>
//   );
// }

export interface IInlineButtonProps extends IButtonFormatProps {
  format: InlineFormat;
}

export function MarkButton({ format, icon }: IInlineButtonProps): JSX.Element {
  const editor = useSlate();
  const Icon = iconMap[icon];
  return (
    <BaseMarkButton
      isActive={isMarkActive(editor, format)}
      onClick={() => {
        toggleMark(editor, format);
      }}
    >
      <Icon size={20} />
    </BaseMarkButton>
  );
}
