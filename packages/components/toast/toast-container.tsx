import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { usePortal } from '@chirpy/hooks';

import { IToast } from './toast-context';
import { ToastItem } from './toast-item';
import { useToast } from './use-toast';

export type ToastContainerProps = React.PropsWithChildren<{
  // title: string;
}>;

export function ToastContainer(/* props: ToastContainerProps*/): JSX.Element {
  const { toasts, setToasts } = useToast();

  const portal = usePortal('basic');
  const handleDismiss = React.useCallback((id: string) => {
    setToasts((prev: IToast[]) => prev.filter((toast) => toast.id !== id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!portal) {
    return <></>;
  }
  return ReactDOM.createPortal(
    <ul className={clsx(`fixed right-4 bottom-8 space-y-2 flex flex-col items-end`)}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <m.li
            key={toast.id}
            layout
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <ToastItem {...toast} onDismiss={handleDismiss} />
          </m.li>
        ))}
      </AnimatePresence>
    </ul>,
    portal,
  );
}
