import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import * as React from 'react';

import { cardBg } from '../../styles/common';

const Tooltip = { ...TooltipPrimitive };

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={clsx(
      cardBg,
      'z-100 isolate select-none overflow-hidden rounded-md border px-3 py-1.5 text-sm leading-none text-primary-1100 shadow-md will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slide-up-and-fade data-[state=delayed-open]:data-[side=left]:animate-slide-right-and-fade data-[state=delayed-open]:data-[side=right]:animate-slide-left-and-fade data-[state=delayed-open]:data-[side=top]:animate-slide-down-and-fade',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
Tooltip.Content = TooltipContent;

export { Tooltip };
