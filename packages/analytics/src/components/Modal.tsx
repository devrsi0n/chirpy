import { Dialog } from '@headlessui/react';
import { forwardRef, HTMLAttributes } from 'react';

import { cx } from '../lib/utils';

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <Dialog.Title
      ref={ref}
      className={cx('mb-2 text-lg font-medium', className)}
      {...props}
    >
      {children}
    </Dialog.Title>
  );
});
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <Dialog.Description
      ref={ref}
      className={cx('mb-5 text-sm', className)}
      {...props}
    >
      {children}
    </Dialog.Description>
  );
});
ModalDescription.displayName = 'ModalDescription';

const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <Dialog.Panel
        ref={ref}
        className={cx(
          'mx-auto flex h-auto w-full max-w-2xl flex-col rounded-xl bg-white px-10 py-9',
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Panel>
    );
  },
);
ModalContent.displayName = 'ModalDescription';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 grid place-content-center">
        {children}
      </div>
    </Dialog>
  );
}

export default Object.assign(Modal, {
  Title: ModalTitle,
  Description: ModalDescription,
  Content: ModalContent,
});
