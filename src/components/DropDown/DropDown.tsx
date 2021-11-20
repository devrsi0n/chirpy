/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import { Menu } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { cardBg, listHoverable } from '$/styles/common';

import { easeInOut } from '../Animation';
import { Button, IconButton } from '../Button';

export type Shape = 'circle' | 'square';

export type DropDownProps = React.PropsWithChildren<{
  content: React.ReactNode;
  buttonProps?: {
    shape?: Shape;
    ariaLabel?: string;
  };
  styles?: {
    root?: TwStyle;
    button?: TwStyle;
    items?: TwStyle;
  };
}>;

export function DropDown({ content, buttonProps, styles, children }: DropDownProps): JSX.Element {
  const { shape, ariaLabel } = {
    shape: 'circle',
    ariaLabel: 'Click to open the dropdown',
    ...buttonProps,
  };
  return (
    <div css={[tw`relative inline-block text-left`, styles?.root]}>
      <Menu>
        {({ open }: { open: boolean }) => (
          <>
            <div css={styles?.button}>
              <Menu.Button as={shape === 'circle' ? IconButton : Button} aria-label={ariaLabel}>
                {content}
                {shape === 'square' && (
                  <ChevronDown css={[tw`w-5 h-5 ml-2 -mr-1 transform`, open && tw`rotate-180`]} />
                )}
              </Menu.Button>
            </div>
            <AnimatePresence>
              {open && (
                <m.div {...easeInOut}>
                  <Menu.Items
                    static
                    css={[
                      tw`absolute right-0 mt-1 border divide-y rounded-md shadow-lg outline-none space-y-1 p-1 z-30`,
                      cardBg,
                      styles?.items,
                    ]}
                  >
                    {children}
                  </Menu.Items>
                </m.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}

DropDown.Item = DropDownItem;

export type DropDownItemProps = React.PropsWithChildren<
  {
    className?: string;
    disableAutoDismiss?: boolean;
  } & Pick<React.ComponentProps<typeof Menu.Item>, 'onClick'>
>;

export function DropDownItem(props: DropDownItemProps): JSX.Element {
  const child = props.disableAutoDismiss ? (
    <div onClick={(e) => props.disableAutoDismiss && e.stopPropagation()}>{props.children}</div>
  ) : (
    props.children
  );
  return (
    <Menu.Item onClick={props.onClick}>
      {
        (/* { active }: ItemRenderPropArg */) => (
          <div
            css={[listHoverable, itemStyle, !props.disableAutoDismiss && DropDownItemPadding]}
            className={props.className}
          >
            {child}
          </div>
        )
      }
    </Menu.Item>
  );
}

export const DropDownItemPadding = tw`px-6 py-2`;

const itemStyle = tw`transition flex flex-row items-center border-none text-gray-1200 cursor-pointer w-full text-sm text-right`;
