import * as React from 'react';
import { Transition } from '@headlessui/react';

export type DialogProps = React.PropsWithChildren<{
  show: boolean;
  title: string;
  footer?: React.ReactNode;
}>;

export function Dialog({ title, footer, children, show }: DialogProps): JSX.Element {
  return (
    <Transition show={show}>
      <dialog className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition
            show={show}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={`fixed inset-0 transition-opacity`}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75 z-30"></div>
          </Transition>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
          <Transition
            show={show}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 flex flex-col justify-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                    {title}
                  </h3>
                  <div className="mt-4">
                    <div className="text-sm leading-5 text-gray-500">{children}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">{footer}</div>
          </Transition>
        </div>
      </dialog>
    </Transition>
  );
}

type IDialogFooterProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function DialogFooter({ className, ...restProps }: IDialogFooterProps): JSX.Element {
  return (
    <div
      {...restProps}
      className={`space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 sm:flex sm:flex-row sm:justify-end mt-8 ${className}`}
    />
  );
}
