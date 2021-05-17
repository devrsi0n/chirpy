import { ClassNames } from '@emotion/react';
import Dismiss from '@geist-ui/react-icons/x';
import { Transition } from '@headlessui/react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { bluredBg, bluredOverlay } from '$/styles/common';

import { IconButton } from '../Button';

export type DialogProps = React.PropsWithChildren<{
  show: boolean;
  title: React.ReactNode;
  styles?: {
    root?: TwStyle;
    content?: TwStyle;
  };
  onClose: (value: boolean) => void;
}>;

export function Dialog({ title, children, show, onClose, styles = {} }: DialogProps): JSX.Element {
  return (
    <Transition show={show} as={React.Fragment}>
      <HeadlessDialog
        tw="fixed inset-0 z-20 overflow-y-auto"
        css={styles.root}
        open={show}
        onClose={onClose}
        static
      >
        <div tw="min-h-screen px-4 text-center">
          <ClassNames>
            {({ css }) => (
              <>
                <Transition.Child
                  as={React.Fragment}
                  enter={css(tw`ease-out duration-300`)}
                  enterFrom={css(tw`opacity-0`)}
                  enterTo={css(tw`opacity-100`)}
                  leave={css(tw`ease-in duration-200`)}
                  leaveFrom={css(tw`opacity-100`)}
                  leaveTo={css(tw`opacity-0`)}
                  css={tw`fixed inset-0 transition-opacity`}
                >
                  <HeadlessDialog.Overlay css={[tw`fixed inset-0`, bluredOverlay]} />
                </Transition.Child>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span tw="inline-block h-screen align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <Transition.Child
                  as={React.Fragment}
                  enter={css(tw`ease-out duration-300`)}
                  enterFrom={css(tw`opacity-0 scale-95`)}
                  enterTo={css(tw`opacity-100 scale-100`)}
                  leave={css(tw`ease-in duration-200`)}
                  leaveFrom={css(tw`opacity-100 scale-100`)}
                  leaveTo={css(tw`opacity-0 scale-95`)}
                >
                  <div
                    tw="inline-block w-full max-w-md p-6 py-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg relative"
                    css={[styles.content]}
                  >
                    <IconButton size="sm" tw="absolute right-1 top-1" onClick={() => onClose(true)}>
                      <Dismiss />
                    </IconButton>
                    <div tw="flex flex-row justify-between items-start">
                      <HeadlessDialog.Title as="h2" tw="text-2xl font-bold leading-8 text-gray-900">
                        {title}
                      </HeadlessDialog.Title>
                    </div>
                    <div tw="mt-4">
                      <div tw="text-sm text-gray-500">{children}</div>
                    </div>
                  </div>
                </Transition.Child>
              </>
            )}
          </ClassNames>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

type IDialogFooterProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function DialogFooter({ className, ...restProps }: IDialogFooterProps): JSX.Element {
  return (
    <div
      {...restProps}
      tw="space-y-2 space-x-0 sm:(space-y-0 space-x-2 flex flex-row justify-end) mt-8"
      className={className}
    />
  );
}
