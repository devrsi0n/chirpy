import * as React from 'react';

import { noop } from '@chirpy-dev/utils';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface IToastAction {
  label: string;
  onClick: () => void;
}

export interface IToast {
  id: string;
  title: string;
  type?: ToastType;
  description?: string;
  /**
   * Toast will not be dismissed automatically.
   * @default false
   */
  persistent?: boolean;
  action?: IToastAction;
}

export type ShowToastProps = Omit<IToast, 'id'>;

export interface IToastContextType {
  toasts: IToast[];
  showToast: (props: ShowToastProps) => void;
  setToasts: React.Dispatch<React.SetStateAction<IToast[]>>;
}

export const ToastContext = React.createContext<IToastContextType>({
  toasts: [],
  showToast: noop,
  setToasts: noop,
});
