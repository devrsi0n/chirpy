import { Popover as HeadlessPopover } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';

import { IconAlertTriangle } from '../icons';

type ButtonDimension = { height?: number; width?: number };
export type Placement = 'top' | 'topEnd' | 'bottomEnd';

export interface IPopoverPanelProps {
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
  children?: React.ReactNode;
  buttonRect?: ButtonDimension;
}

export const PopoverPanel = React.forwardRef(function PopoverPanel(
  {
    autoClose = true,
    placement = 'top',
    buttonRect,
    styles,
    type,
    children,
  }: IPopoverPanelProps,
  ref: React.ForwardedRef<HTMLDivElement | null>,
): JSX.Element {
  return (
    <HeadlessPopover.Panel
      static
      className={clsx(
        `absolute right-0 isolate z-10 border border-gray-400 shadow-2xl`,
        panelBorder,
      )}
      style={getPanelStyles(placement, {
        height: buttonRect?.height,
        width: buttonRect?.width,
      })}
      role="region"
      aria-label="Popover panel"
      ref={ref}
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
                  <IconAlertTriangle />
                </div>
              </div>
            )}
            {children}
          </div>
          <div
            className={clsx(
              `absolute h-4 w-4 rotate-45`,
              panelBg,
              `border-t-0 border-l-0`,
            )}
            style={getBeakStyles(placement, buttonRect?.width)}
          />
        </>
      )}
    </HeadlessPopover.Panel>
  );
});

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

function getBeakStyles(
  placement: Placement,
  width = DEFAULT_WIDTH,
): React.CSSProperties {
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

export const panelBg = `bg-gray-100 align-baseline`;
export const panelBorder = `rounded-lg`;
