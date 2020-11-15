import * as React from 'react';

export interface IRichTextEditorContext {
  disabled?: boolean;
}

export const RichTextEditorContext = React.createContext<IRichTextEditorContext>({});

export function useRichTextEditorContext(): IRichTextEditorContext {
  return React.useContext<IRichTextEditorContext>(RichTextEditorContext);
}
