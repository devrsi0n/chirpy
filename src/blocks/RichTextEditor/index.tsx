import dynamic from 'next/dynamic';
import type { IRichTextEditorProps } from './RichTextEditor';

const DynamicRichTextEditor = dynamic(() => import('./RichTextEditor'));

export function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  return <DynamicRichTextEditor {...props} />;
}
