import { Popover as HeadlessPopover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { easeInOut } from '../animation';
import { Button } from '../button';
import { AlertTriangle } from '../icons';

export type Placement = 'top' | 'topEnd' | 'bottomEnd';

export interface IPopoverProps extends Omit<IPopoverContentProps, 'open'> {
  /**
   * Control the panel visibility.
   * @default false Auto show/hide the panel
   */
  open?: boolean;
}

export function Popover({ open, ...contentProps }: IPopoverProps): JSX.Element {
  return (
    <HeadlessPopover className="relative">
      {typeof open === 'boolean' ? (
        <PopoverContent {...contentProps} open={open} />
      ) : (
        ({ open }) => <PopoverContent {...contentProps} open={open} />
      )}
    </HeadlessPopover>
  );
}

interface IPopoverContentProps {
  open: boolean;
  children: React.ReactNode;
  content: React.ReactNode;
  buttonProps?: $TsAny;
  buttonAs?: React.ElementType<Record<string, unknown>>;
  /**
   * TODO
   */
  placement?: Placement;
  /**
   * Close panel automatically when clicking the content of the panel.
   * @default true
   */
  autoClose?: boolean;
  styles?: {
    panel?: string;
    icon?: string;
  };
  type?: 'alert' | 'default';
}

function PopoverContent({
  autoClose = true,
  buttonProps,
  buttonAs,
  children,
  content,
  placement = 'top',
  styles,
  open,
  type,
}: IPopoverContentProps): JSX.Element {
  const buttonRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  return (
    <>
      <HeadlessPopover.Button
        variant="text"
        as={buttonAs || Button}
        {...buttonProps}
        ref={buttonRef}
      >
        {children}
      </HeadlessPopover.Button>

      <AnimatePresence>
        {open && (
          <m.div {...easeInOut}>
            <HeadlessPopover.Panel
              static
              className={clsx(
                `absolute right-0 isolate z-10 border border-gray-400 shadow-2xl`,
                panelBorder,
              )}
              style={getPanelStyles(placement, {
                height: buttonRef.current?.getBoundingClientRect().height,
                width: buttonRef.current?.getBoundingClientRect().width,
              })}
              role="region"
              aria-label="Popover panel"
            >
              {({ close }) => (
                <>
                  <div
                    className={clsx(
                      `relative flex space-x-4 rounded-lg py-3 px-5`,
                      panelBg,
                      panelBorder,
                      styles?.panel,
                    )}
                    // onClick={() => autoClose && close()}
                    onKeyDown={() => autoClose && close()}
                  >
                    {type === 'alert' && (
                      <div className="hidden h-full rounded-full bg-red-300 xs:block">
                        <div className={clsx('p-2 text-red-900', styles?.icon)}>
                          <AlertTriangle />
                        </div>
                      </div>
                    )}
                    {content}
                  </div>
                  <div
                    className={clsx(`absolute h-4 w-4 rotate-45`, panelBg, `border-t-0 border-l-0`)}
                    style={getBeakStyles(
                      placement,
                      buttonRef.current?.getBoundingClientRect().width,
                    )}
                  />
                </>
              )}
            </HeadlessPopover.Panel>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getPanelStyles(
  placement: Placement,
  { width, height }: ButtonDimension,
): React.CSSProperties {
  const bottom = (height || 40) + 16;
  const top = (height || 40) + 16;

  switch (placement) {
    case 'top':
      return {
        bottom,
        transform: `translateX(calc(50% - ${(width || DEFAULT_WIDTH) / 2}px))`,
      };
    case 'topEnd':
      return {
        bottom,
        right: 0,
      };
    case 'bottomEnd':
      return {
        top,
        right: 0,
      };
    default:
      return {};
  }
}

function getBeakStyles(placement: Placement, width = DEFAULT_WIDTH): React.CSSProperties {
  const bottom = '-8px';
  switch (placement) {
    case 'top':
      return {
        bottom,
        right: 'calc(50% - 8px)',
      };
    case 'topEnd':
      return {
        bottom,
        right: `${width / 2}px`,
      };
    case 'bottomEnd':
      return {
        top: '-8px',
        right: `${width / 2}px`,
      };
    default:
      return {};
  }
}

const DEFAULT_WIDTH = 40;

type ButtonDimension = { height?: number; width?: number };

const panelBg = `bg-gray-100 align-baseline`;
const panelBorder = `rounded-lg`;
