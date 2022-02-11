import React from 'react';

import { ToastContext, IToastContextType } from './toast-context';

export const useToast = (): IToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error(`'useToast' must be used within a ToastProvider`);
  }
  return context;
};
