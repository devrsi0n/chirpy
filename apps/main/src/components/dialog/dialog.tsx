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
          <div className="flex min-h-full items-center justify-center px-4">
            <m.div {...easeInOutOpacity} className="fixed inset-0">
              <div className={clsx(`fixed inset-0`, bluredOverlay, styles.overlay)} />
            </m.div>
            <m.div {...easeInOut}>
              <HeadlessDialog.Panel className="relative inline-block shadow-md">
                <div
                  className={clsx(
                    `flex max-w-lg flex-row space-x-4 px-6 pt-4 pb-0 sm:px-8 sm:pt-6 sm:pb-0`,
                    cardBg,
                    !footer ? `rounded-xl` : `rounded-t-xl`,
                    styles.content,
                  )}
                >
                  {type === 'Alert' && (
                    <div className="h-full rounded-full bg-red-300">
                      <div className="p-2 text-red-900">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                  )}
                  <div className="overflow-hidden text-left align-middle">
                    {showDismissButton && (
                      <IconButton
                        className="!absolute right-3 top-3 bg-gray-300 p-0.5 dark:bg-gray-600 dark:hover:bg-gray-700"
                        onClick={() => onClose(true)}
                        aria-label="Dismiss"
                      >
                        <Dismiss />
                      </IconButton>
                    )}
                    <div className="flex flex-row items-start justify-between">
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
              </HeadlessDialog.Panel>
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
        'space-y-2 space-x-0 rounded-b-xl px-6 pt-4 pb-6 sm:flex sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4 sm:px-8',
        cardBg,
        className,
      )}
    >
      {children}
    </div>
  );
}

DialogFooter.displayName = 'DialogFooter';
