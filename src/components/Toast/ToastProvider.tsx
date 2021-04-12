import * as React from 'react';

import { ClientOnly } from '../ClientOnly';
import { ToastContainer } from './ToastContainer';
import { ToastContext, Toast, ShowToastProps } from './ToastContext';

export type ToastProviderProps = React.PropsWithChildren<{
  //
}>;

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

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
