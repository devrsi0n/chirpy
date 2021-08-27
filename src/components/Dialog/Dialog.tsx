import AlertTriangle from '@geist-ui/react-icons/alertTriangle';
import Dismiss from '@geist-ui/react-icons/x';
import { Transition, Dialog as HeadlessDialog } from '@headlessui/react';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { bluredOverlay } from '$/styles/common';

import { IconButton } from '../Button';

export type DialogProps = React.PropsWithChildren<{
  show: boolean;
  title: React.ReactNode;
  styles?: {
    root?: TwStyle;
    content?: TwStyle;
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
    <Transition appear show={show} as={React.Fragment}>
      <HeadlessDialog
        tw="fixed inset-0 z-20 overflow-y-auto"
        css={styles.root}
        open={show}
        onClose={onClose}
        static
      >
        <div tw="min-h-full px-4 flex justify-center items-center">
          <Transition.Child
            as={React.Fragment}
            enter={`ease-out duration-300`}
            enterFrom={`opacity-0`}
            enterTo={`opacity-100`}
            leave={`ease-in duration-200`}
            leaveFrom={`opacity-100`}
            leaveTo={`opacity-0`}
            css={tw`fixed inset-0 transition-opacity`}
          >
            <HeadlessDialog.Overlay css={[tw`fixed inset-0`, bluredOverlay]} />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter={`ease-out duration-300`}
            enterFrom={`opacity-0 scale-95`}
            enterTo={`opacity-100 scale-100`}
            leave={`ease-in duration-200`}
            leaveFrom={`opacity-100 scale-100`}
            leaveTo={`opacity-0 scale-95`}
          >
            <div tw="inline-block transition-all transform shadow-md relative">
              <div
                css={[
                  tw`max-w-lg flex flex-row px-4 pt-5 pb-4 sm:(p-6 pb-4) space-x-4 bg-white`,
                  !footer ? tw`rounded-xl` : tw`rounded-t-xl`,
                  styles.content,
                ]}
              >
                {type === 'Alert' && (
                  <div tw="bg-red-100 h-full rounded-full">
                    <div tw="p-2 text-red-600">
                      <AlertTriangle size={24} />
                    </div>
                  </div>
                )}
                <div tw=" overflow-hidden text-left align-middle">
                  {showDismissButton && (
                    <IconButton
                      size="sm"
                      tw="absolute right-1 top-1"
                      onClick={() => onClose(true)}
                      aria-label="Dismiss"
                    >
                      <Dismiss />
                    </IconButton>
                  )}
                  <div tw="flex flex-row justify-between items-start">
                    <HeadlessDialog.Title as="h2" tw="text-2xl font-medium leading-8 text-gray-900">
                      {title}
                    </HeadlessDialog.Title>
                  </div>
                  <div tw="mt-4">
                    <div tw="text-sm text-gray-500">{otherChildren}</div>
                  </div>
                </div>
              </div>
              {footer}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
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
      tw="bg-gray-50 px-4 py-3 space-y-2 space-x-0 sm:(px-6 space-y-0 space-x-4 flex flex-row justify-end) rounded-b-xl"
      className={className}
    >
      {children}
    </div>
  );
}

DialogFooter.displayName = 'DialogFooter';
