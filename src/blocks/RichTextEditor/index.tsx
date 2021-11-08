import dynamic from 'next/dynamic';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../ErrorFallback';

import type { IRichTextEditorProps } from './RichTextEditor';

const DynamicRichTextEditor = dynamic(
  () => import(/* webpackChunkName: "rich-text-editor"*/ './RichTextEditor'),
  {
    ssr: false,
  },
);

export function RichTextEditor(props: IRichTextEditorProps): JSX.Element {
  const handleError = React.useCallback((error: Error, info: { componentStack: string }) => {
    console.log({ error, info });
  }, []);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <DynamicRichTextEditor {...props} />
    </ErrorBoundary>
  );
}

export type { IRichTextEditorProps } from './RichTextEditor';
export type { RTEValue } from './type';
