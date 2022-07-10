import { Popover as HeadlessPopover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { easeInOut } from '../animation';
import { PopoverButton } from './popover-button';
import { PopoverPanel } from './popover-panel';

export interface IPopoverProps extends Omit<IPopoverContentProps, 'open'> {
  /**
   * Control the panel visibility.
   * @default false Auto show/hide the panel
   */
  open?: boolean;
  className?: string;
}

export function Popover({
  open,
  className,
  ...contentProps
}: IPopoverProps): JSX.Element {
  return (
    <HeadlessPopover className={clsx('relative', className)}>
      {typeof open === 'boolean' ? (
        <PopoverContent {...contentProps} open={open} />
      ) : (
        ({ open }) => <PopoverContent {...contentProps} open={open} />
      )}
    </HeadlessPopover>
  );
}

Popover.Button = PopoverButton;
Popover.Panel = PopoverPanel;

export interface IPopoverContentProps {
  open: boolean;
  children: React.ReactNode;
}

const ERROR = new Error(
  `Popover children only accept a Popover.Panel and a Popover.Button`,
);

function PopoverContent({ children, open }: IPopoverContentProps): JSX.Element {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement[];
  if (childrenArray.length !== 2) {
    throw ERROR;
  }
  const panel = childrenArray.find((element) => element.type === PopoverPanel);
  const button = childrenArray.find(
    (element) => element.type === PopoverButton,
  );
  if (!panel || !button) {
    throw ERROR;
  }

  const buttonRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  return (
    <>
      {React.cloneElement(button, { ref: buttonRef })}
      <AnimatePresence>
        {open && (
          <m.div {...easeInOut}>
            {React.cloneElement(panel, {
              buttonRect: buttonRef.current?.getBoundingClientRect(),
            })}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
