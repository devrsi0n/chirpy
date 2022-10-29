import { Dialog as HeadlessDialog } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { bluredOverlay, cardBg } from '../../styles/common';
import { easeInOut, easeInOutOpacity } from '../animation';
import { IconButton } from '../button';
import { IconAlertTriangle, IconX } from '../icons';

type Size = 'sm' | 'base';
const SIZE_STYLES: Record<
  Size,
  {
    content: string;
    title: string;
    footer: string;
    icon: number;
  }
> = {
  sm: {
    content: 'px-4 pt-4 pb-0 max-w-sm',
    title: 'text-xl font-bold leading-none',
    footer: 'px-4 pt-2 pb-4',
    icon: 20,
  },
  base: {
    content: 'px-6 pt-4 pb-0 sm:px-8 sm:pt-6 sm:pb-0 max-w-lg',
    title: 'text-2xl font-bold leading-none',
    footer: 'px-6 pt-4 pb-6 sm:px-8',
    icon: 24,
  },
};

export type DialogChild =
  | React.ReactElement<DialogBodyProps>
  | React.ReactElement<DialogFooterProps>;

export type DialogProps = {
  children: DialogChild | DialogChild[];
  show: boolean;
  title: React.ReactNode;
  styles?: {
    root?: string;
    panel?: string;
    content?: string;
    overlay?: string;
  };
  /**
   * @default false
   */
  showDismissButton?: boolean;
  onClose: (value: boolean) => void;
  type?: 'alert' | 'default';
  size?: Size;
};

export function Dialog({
  title,
  children,
  show,
  onClose,
  styles = {},
  showDismissButton,
  type = 'default',
  size = 'base',
}: DialogProps): JSX.Element {
  const childArray = React.Children.toArray(children);
  const footer = childArray.find(
    (child) => (child as React.ReactElement).type === DialogFooter,
  );
  const body = childArray.find(
    (child) => (child as React.ReactElement).type === DialogBody,
  );
  const sizeStyles = SIZE_STYLES[size];
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
              <div
                className={clsx(`fixed inset-0`, bluredOverlay, styles.overlay)}
              />
            </m.div>
            <m.div {...easeInOut}>
              <HeadlessDialog.Panel
                className={clsx('relative inline-block ', styles.panel)}
              >
                <div
                  className={clsx(
                    `flex flex-row space-x-4 shadow-xl`,
                    cardBg,
                    sizeStyles.content,
                    !footer ? `rounded-xl` : `rounded-t-xl`,
                    styles.content,
                  )}
                >
                  {type === 'alert' && (
                    <div className="h-full rounded-full bg-red-300">
                      <div className="p-2 text-red-900">
                        <IconAlertTriangle size={sizeStyles.icon} />
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
                        <IconX />
                      </IconButton>
                    )}
                    <div className="flex flex-row items-start justify-between">
                      <HeadlessDialog.Title
                        as="h1"
                        className={clsx('text-gray-1200', sizeStyles.title)}
                      >
                        {title}
                      </HeadlessDialog.Title>
                    </div>
                    {body}
                  </div>
                </div>
                {footer &&
                  React.cloneElement(footer as React.ReactElement, { size })}
              </HeadlessDialog.Panel>
            </m.div>
          </div>
        </HeadlessDialog>
      )}
    </AnimatePresence>
  );
}

Dialog.Footer = DialogFooter;
Dialog.Body = DialogBody;

export type DialogBodyProps = React.PropsWithChildren<
  React.ComponentProps<'div'>
>;

function DialogBody({
  children,
  className,
  ...divProps
}: DialogBodyProps): JSX.Element {
  return (
    <div {...divProps} className={clsx('mt-4', className)}>
      <div className="text-sm text-gray-1100">{children}</div>
    </div>
  );
}

export type DialogFooterProps = React.PropsWithChildren<
  React.ComponentProps<'div'>
> &
  Pick<DialogProps, 'size'>;

function DialogFooter({
  className,
  children,
  size = 'base',
  ...restProps
}: DialogFooterProps): JSX.Element {
  return (
    <div
      {...restProps}
      className={clsx(
        'flex flex-col space-y-2 space-x-0 rounded-b-xl xs:flex-row xs:justify-end xs:space-y-0 xs:space-x-4',
        cardBg,
        SIZE_STYLES[size].footer,
        className,
      )}
    >
      {children}
    </div>
  );
}
