import React from 'react';

import { ToastContext, ToastContextType } from './toast-context';

export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error(`'useToast' must be used within a ToastProvider`);
  }
  return context;
};
