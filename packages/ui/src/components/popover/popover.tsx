import { Popover as HeadlessPopover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { easeInOut } from '../animation';
import { IPopoverButtonProps, PopoverButton } from './popover-button';
import { IPopoverPanelProps, PopoverPanel } from './popover-panel';

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

export type PopoverChild =
  | React.ReactElement<IPopoverButtonProps>
  | React.ReactElement<IPopoverPanelProps>;

export interface IPopoverContentProps {
  open: boolean;
  children: PopoverChild[];
}

function PopoverContent({ children, open }: IPopoverContentProps): JSX.Element {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement[];
  const panel = childrenArray.find((element) => element.type === PopoverPanel);
  const button = childrenArray.find(
    (element) => element.type === PopoverButton,
  );

  const buttonRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  return (
    <>
      {button && React.cloneElement(button, { ref: buttonRef })}
      <AnimatePresence>
        {open && (
          <motion.div {...easeInOut}>
            {panel &&
              React.cloneElement(panel, {
                buttonRect: buttonRef.current?.getBoundingClientRect(),
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
