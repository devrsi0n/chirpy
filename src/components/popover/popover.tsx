import { Popover as HeadlessPopover } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { easeInOut } from '../animation';
import { Button } from '../button';

export type Placement = 'top' | 'topEnd' | 'bottomEnd';

export interface IPopoverProps {
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
    panel?: TwStyle;
  };
}

export function Popover({
  autoClose = true,
  buttonProps,
  buttonAs,
  children,
  content,
  placement = 'top',
  styles,
}: IPopoverProps): JSX.Element {
  const buttonRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  const handleClickPanel = () => {
    if (autoClose) {
      buttonRef.current?.click();
    }
  };

  return (
    <HeadlessPopover tw="relative">
      {({ open }) => (
        <>
          <HeadlessPopover.Button
            {...buttonProps}
            variant="text"
            as={buttonAs || Button}
            ref={buttonRef}
          >
            {children}
          </HeadlessPopover.Button>

          <AnimatePresence>
            {open && (
              <m.div {...easeInOut}>
                <HeadlessPopover.Panel
                  static
                  css={[tw`absolute right-0 z-10 shadow-2xl isolate`, panelBorder]}
                  style={getPanelStyles(placement, {
                    height: buttonRef.current?.getBoundingClientRect().height,
                    width: buttonRef.current?.getBoundingClientRect().width,
                  })}
                  role="region"
                  aria-label="Popover panel"
                >
                  <div
                    css={[tw`relative py-3 px-5 rounded-lg`, panelBg, panelBorder, styles?.panel]}
                    onClick={handleClickPanel}
                    onKeyDown={handleClickPanel}
                  >
                    {content}
                  </div>
                  <div
                    css={[
                      tw`absolute h-4 w-4 transform rotate-45`,
                      panelBg,
                      tw`border-t-0 border-l-0`,
                    ]}
                    style={getBeakStyles(
                      placement,
                      buttonRef.current?.getBoundingClientRect().width,
                    )}
                  />
                </HeadlessPopover.Panel>
              </m.div>
            )}
          </AnimatePresence>
        </>
      )}
    </HeadlessPopover>
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

const panelBg = tw`bg-gray-100 align-baseline`;
const panelBorder = tw`rounded-lg`;
