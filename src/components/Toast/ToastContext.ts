import * as React from 'react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';
export type Toast = {
  id: string;
  title: string;
  type?: ToastType;
  description?: string;
};
export type ShowToastProps = Omit<Toast, 'id'>;
export type ToastContextType = {
  toasts: Toast[];
  showToast: (props: ShowToastProps) => void;
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
};

export const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  showToast: () => null,
  setToasts: () => null,
});

export const useToastContext = (): ToastContextType => React.useContext(ToastContext);
