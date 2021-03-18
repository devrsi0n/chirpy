import * as React from 'react';
import { Transition } from '@headlessui/react';
import ReactDOM from 'react-dom';
import tw from 'twin.macro';
import { ClassNames } from '@emotion/react';

export type DialogProps = React.PropsWithChildren<{
  show: boolean;
  title: string;
}>;

export function Dialog({ title, children, show }: DialogProps): JSX.Element {
  return ReactDOM.createPortal(
    <Transition show={show}>
      <div role="dialog" tw="fixed z-50 inset-0 overflow-y-auto">
        <div tw="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <ClassNames>
            {({ css }) => (
              <>
                <Transition
                  show={show}
                  enter={css(tw`ease-out duration-300`)}
                  enterFrom={css(tw`opacity-0`)}
                  enterTo={css(tw`opacity-100`)}
                  leave={css(tw`ease-in duration-200`)}
                  leaveFrom={css(tw`opacity-100`)}
                  leaveTo={css(tw`opacity-0`)}
                  css={tw`fixed inset-0 transition-opacity`}
                >
                  <div tw="absolute inset-0 bg-gray-500 opacity-75 z-30"></div>
                </Transition>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span tw="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <Transition
                  show={show}
                  enter={css(tw`ease-out duration-300`)}
                  enterFrom={css(tw`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`)}
                  enterTo={css(tw`opacity-100 translate-y-0 sm:scale-100`)}
                  leave={css(tw`ease-in duration-200`)}
                  leaveFrom={css(tw`opacity-100 translate-y-0 sm:scale-100`)}
                  leaveTo={css(tw`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`)}
                  css={tw`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:(my-8 align-middle max-w-lg w-full)`}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div tw="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div tw="">
                      <div tw="mt-3 flex flex-col justify-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 tw="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                          {title}
                        </h3>
                        <div tw="mt-4">
                          <div tw="text-sm text-gray-500">{children}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </>
            )}
          </ClassNames>
        </div>
      </div>
    </Transition>,
    document.body,
  );
}

type IDialogFooterProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function DialogFooter({ className, ...restProps }: IDialogFooterProps): JSX.Element {
  return (
    <div
      {...restProps}
      tw="space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 sm:flex sm:flex-row sm:justify-end mt-8"
      className={className}
    />
  );
}
