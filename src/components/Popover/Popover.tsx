import { Popover as HeadLessPopover } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { easeInOut } from '../Animation';
import { Button } from '../Button';

export type Placement = 'top' | 'topEnd';

export interface IPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  buttonProps?: $TsAny;
  // eslint-disable-next-line @typescript-eslint/ban-types
  buttonAs?: React.ElementType<{}>;
  /**
   * TODO
   */
  placement?: Placement;
  /**
   * Close panel automatically when clicking the content of the panel.
   * @default true
   */
  autoClose?: boolean;
}

export function Popover({
  autoClose = true,
  buttonProps,
  buttonAs,
  children,
  content,
  placement = 'top',
}: IPopoverProps): JSX.Element {
  const buttonRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  const handleClickPanel = () => {
    if (autoClose) {
      buttonRef.current?.click();
    }
  };

  return (
    <HeadLessPopover tw="relative">
      {({ open }) => (
        <>
          <HeadLessPopover.Button {...buttonProps} as={buttonAs || Button} ref={buttonRef}>
            {children}
          </HeadLessPopover.Button>

          <AnimatePresence>
            {open && (
              <m.div {...easeInOut}>
                <HeadLessPopover.Panel
                  static
                  css={[tw`absolute right-0 z-10`, panelBorder]}
                  style={{
                    ...getPanelStyles(placement, {
                      height: buttonRef.current?.getBoundingClientRect().height,
                      width: buttonRef.current?.getBoundingClientRect().width,
                    }),
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <div
                    css={[tw`relative py-3 px-5 rounded-lg`, panelBg, panelBorder]}
                    onClick={handleClickPanel}
                    onKeyDown={handleClickPanel}
                    role="button"
                    tabIndex={0}
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
                </HeadLessPopover.Panel>
              </m.div>
            )}
          </AnimatePresence>
        </>
      )}
    </HeadLessPopover>
  );
}

function getPanelStyles(
  placement: Placement,
  { width, height }: ButtonDimension,
): React.CSSProperties {
  const bottom = (height || 40) + 16;
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
    default:
      return {};
  }
}

const DEFAULT_WIDTH = 40;

type ButtonDimension = { height?: number; width?: number };

const panelBg = [tw`bg-white`, tw`border border-gray-500 border-opacity-10`];
const panelBorder = tw`rounded-lg`;
