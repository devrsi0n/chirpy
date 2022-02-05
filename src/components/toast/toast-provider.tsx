import * as React from 'react';

import { ClientOnly } from '../client-only';
import { ToastContainer } from './toast-container';
import { ToastContext, IToast, ShowToastProps } from './toast-context';

export type ToastProviderProps = React.PropsWithChildren<{
  //
}>;

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = React.useState<IToast[]>([]);

  const showToast = React.useCallback((props: ShowToastProps) => {
    const toast = { ...props, id: Math.random().toString().slice(2, 8) };
    setToasts((prev) => [...prev, toast]);
  }, []);

  const contextValue = React.useMemo(() => ({ toasts, showToast, setToasts }), [toasts, showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ClientOnly>
        <ToastContainer />
      </ClientOnly>
    </ToastContext.Provider>
  );
}
