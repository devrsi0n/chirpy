import dynamic from 'next/dynamic';

import type { IRichTextEditorProps } from './RichTextEditor';

const DynamicRichTextEditor = dynamic(
  () => import(/* webpackChunkName: "rich-text-editor"*/ './RichTextEditor'),
  {
    ssr: false,
  },
);

export function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  return <DynamicRichTextEditor {...props} />;
}

export type { IRichTextEditorProps } from './RichTextEditor';
export type { RTEValue } from './type';
