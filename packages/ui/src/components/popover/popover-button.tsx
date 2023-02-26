import { Popover as HeadlessPopover } from '@headlessui/react';
import * as React from 'react';

import { Button, ButtonProps } from '../button';

export interface IPopoverButtonProps extends ButtonProps {
  as?: React.ElementType<Record<string, unknown>>;
}

export const PopoverButton = React.forwardRef<
  HTMLButtonElement,
  IPopoverButtonProps
>(function PopoverButton(
  { as, children, ...buttonProps }: IPopoverButtonProps,
  ref,
): JSX.Element {
  return (
    <HeadlessPopover.Button
      variant="text"
      as={as || Button}
      {...buttonProps}
      ref={ref}
    >
      {children}
    </HeadlessPopover.Button>
  );
});
