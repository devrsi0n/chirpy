import * as React from 'react';

export interface IRichTextEditorContext {
  readOnly?: boolean;
}

export const RichTextEditorContext = React.createContext<IRichTextEditorContext>({});

export function useRichTextEditorContext(): IRichTextEditorContext {
  const context = React.useContext<IRichTextEditorContext>(RichTextEditorContext);
  if (!context) {
    throw new Error('useRichTextEditorContext must be used within a RichTextEditorContext');
  }
  return context;
}

export type RichTextEditorContextProviderProps = React.PropsWithChildren<IRichTextEditorContext>;

export function RichTextEditorContextProvider({
  readOnly: disabled,
  children,
}: RichTextEditorContextProviderProps) {
  return (
    <RichTextEditorContext.Provider value={{ readOnly: disabled }}>
      {children}
    </RichTextEditorContext.Provider>
  );
}
