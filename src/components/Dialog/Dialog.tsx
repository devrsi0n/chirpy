import AlertTriangle from '@geist-ui/react-icons/alertTriangle';
import Dismiss from '@geist-ui/react-icons/x';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { bluredOverlay, cardBg } from '$/styles/common';

import { easeInOut, easeInOutOpacity } from '../Animation';
import { IconButton } from '../Button';

export type DialogProps = React.PropsWithChildren<{
  show: boolean;
  title: React.ReactNode;
  styles?: {
    root?: TwStyle;
    content?: TwStyle;
    overlay?: TwStyle;
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
          tw="fixed inset-0 z-20 overflow-y-auto"
          css={styles.root}
          open={show}
          onClose={onClose}
          static
        >
          <div tw="min-h-full px-4 flex justify-center items-center">
            <m.div {...easeInOutOpacity} tw="fixed inset-0">
              <HeadlessDialog.Overlay css={[tw`fixed inset-0`, bluredOverlay, styles.overlay]} />
            </m.div>
            <m.div {...easeInOut}>
              <div tw="inline-block shadow-md relative">
                <div
                  css={[
                    tw`max-w-lg flex flex-row px-6 pt-4 pb-0 sm:(px-8 pt-6 pb-0) space-x-4`,
                    cardBg,
                    !footer ? tw`rounded-xl` : tw`rounded-t-xl`,
                    styles.content,
                  ]}
                >
                  {type === 'Alert' && (
                    <div tw="bg-red-300 h-full rounded-full">
                      <div tw="p-2 text-red-900">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                  )}
                  <div tw="overflow-hidden text-left align-middle">
                    {showDismissButton && (
                      <IconButton
                        size="sm"
                        tw="absolute right-1 top-1 bg-gray-300 dark:(bg-gray-600 hover:(bg-gray-700))"
                        onClick={() => onClose(true)}
                        aria-label="Dismiss"
                      >
                        <Dismiss />
                      </IconButton>
                    )}
                    <div tw="flex flex-row justify-between items-start">
                      <HeadlessDialog.Title as="h2" tw="text-2xl font-bold leading-none">
                        {title}
                      </HeadlessDialog.Title>
                    </div>
                    <div tw="mt-4">
                      <div tw="text-sm">{otherChildren}</div>
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

type IDialogFooterProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function DialogFooter({
  className,
  children,
  ...restProps
}: IDialogFooterProps): JSX.Element {
  return (
    <div
      {...restProps}
      tw="px-6 pt-4 pb-6 space-y-2 space-x-0 sm:(px-8 space-y-0 space-x-4 flex flex-row justify-end) rounded-b-xl"
      css={cardBg}
      className={className}
    >
      {children}
    </div>
  );
}

DialogFooter.displayName = 'DialogFooter';
