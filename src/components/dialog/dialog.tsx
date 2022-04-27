import AlertTriangle from '@geist-ui/react-icons/alertTriangle';
import Dismiss from '@geist-ui/react-icons/x';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { bluredOverlay, cardBg } from '$/styles/common';

import { easeInOut, easeInOutOpacity } from '../animation';
import { IconButton } from '../button';

export type DialogProps = React.PropsWithChildren<{
  show: boolean;
  title: React.ReactNode;
  styles?: {
    root?: string;
    content?: string;
    overlay?: string;
  };
  /**
   * @default false
   */
  showDismissButton?: boolean;
  onClose: (value: boolean) => void;
  type?: 'Alert';
}>;

export function Dialog({
  title,
  children,
  show,
  onClose,
  styles = {},
  showDismissButton,
  type,
}: DialogProps): JSX.Element {
  let footer: React.ReactElement | null = null;
  const otherChildren: React.ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && (child as any).type.displayName === 'DialogFooter') {
      footer = child as React.ReactElement;
    } else {
      otherChildren.push(child as React.ReactElement);
    }
  });
  return (
    <AnimatePresence>
      {show && (
        <HeadlessDialog
          className={clsx('fixed inset-0 z-20 overflow-y-auto', styles.root)}
          open={show}
          onClose={onClose}
          static
        >
          <div className="min-h-full px-4 flex justify-center items-center">
            <m.div {...easeInOutOpacity} className="fixed inset-0">
              <HeadlessDialog.Overlay
                className={clsx(`fixed inset-0`, bluredOverlay, styles.overlay)}
              />
            </m.div>
            <m.div {...easeInOut}>
              <div className="inline-block shadow-md relative">
                <div
                  className={clsx(
                    `max-w-lg flex flex-row px-6 pt-4 pb-0 sm:px-8 sm:pt-6 sm:pb-0 space-x-4`,
                    cardBg,
                    !footer ? `rounded-xl` : `rounded-t-xl`,
                    styles.content,
                  )}
                >
                  {type === 'Alert' && (
                    <div className="bg-red-300 h-full rounded-full">
                      <div className="p-2 text-red-900">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                  )}
                  <div className="overflow-hidden text-left align-middle">
                    {showDismissButton && (
                      <IconButton
                        className="p-0.5 absolute right-3 top-3 bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                        onClick={() => onClose(true)}
                        aria-label="Dismiss"
                      >
                        <Dismiss />
                      </IconButton>
                    )}
                    <div className="flex flex-row justify-between items-start">
                      <HeadlessDialog.Title
                        as="h2"
                        className="text-2xl font-bold leading-none text-gray-1200"
                      >
                        {title}
                      </HeadlessDialog.Title>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm">{otherChildren}</div>
                    </div>
                  </div>
                </div>
                {footer}
              </div>
            </m.div>
          </div>
        </HeadlessDialog>
      )}
    </AnimatePresence>
  );
}

Dialog.Footer = DialogFooter;

export type IDialogFooterProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

function DialogFooter({ className, children, ...restProps }: IDialogFooterProps): JSX.Element {
  return (
    <div
      {...restProps}
      className={clsx(
        'px-6 pt-4 pb-6 space-y-2 space-x-0 sm:px-8 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-row sm:justify-end rounded-b-xl',
        cardBg,
        className,
      )}
    >
      {children}
    </div>
  );
}

DialogFooter.displayName = 'DialogFooter';
