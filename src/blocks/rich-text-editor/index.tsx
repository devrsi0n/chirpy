import dynamic from 'next/dynamic';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../error-fallback';
import type { IRichTextEditorProps } from './rich-text-editor';

const LazyRichTextEditor = dynamic(
  () => import(/* webpackChunkName: "rich-text-editor"*/ './rich-text-editor'),
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
      <LazyRichTextEditor {...props} />
    </ErrorBoundary>
  );
}

export type { IRichTextEditorProps } from './rich-text-editor';
export type { RTEValue } from './type';
