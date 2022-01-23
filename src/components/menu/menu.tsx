/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { cardBg, listHoverable } from '$/styles/common';

import { easeInOut } from '../animation';
import { Button, IconButton } from '../button';

export type Shape = 'circle' | 'square';

export type MenuProps = React.PropsWithChildren<{
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

export function Menu({ content, buttonProps, styles, children }: MenuProps): JSX.Element {
  const { shape, ariaLabel } = {
    shape: 'circle',
    ariaLabel: 'click to open the menu',
    ...buttonProps,
  };
  return (
    <div css={[tw`relative inline-block text-left`, styles?.root]}>
      <HeadlessMenu>
        {({ open }: { open: boolean }) => (
          <>
            <div css={styles?.button}>
              <HeadlessMenu.Button
                as={shape === 'circle' ? IconButton : Button}
                aria-label={ariaLabel}
              >
                {content}
                {shape === 'square' && (
                  <ChevronDown css={[tw`w-5 h-5 ml-2 -mr-1 transform`, open && tw`rotate-180`]} />
                )}
              </HeadlessMenu.Button>
            </div>
            <AnimatePresence>
              {open && (
                <m.div {...easeInOut}>
                  <HeadlessMenu.Items
                    static
                    css={[
                      tw`absolute right-0 mt-1 border divide-y rounded-md shadow-lg outline-none space-y-1 p-1 z-30`,
                      cardBg,
                      styles?.items,
                    ]}
                  >
                    {children}
                  </HeadlessMenu.Items>
                </m.div>
              )}
            </AnimatePresence>
          </>
        )}
      </HeadlessMenu>
    </div>
  );
}

Menu.Item = MenuItem;

export type MenuItemProps = React.PropsWithChildren<
  {
    className?: string;
    disableAutoDismiss?: boolean;
  } & Pick<React.ComponentProps<typeof HeadlessMenu.Item>, 'onClick'>
>;

export function MenuItem(props: MenuItemProps): JSX.Element {
  const child = props.disableAutoDismiss ? (
    <div onClick={(e) => props.disableAutoDismiss && e.stopPropagation()}>{props.children}</div>
  ) : (
    props.children
  );
  return (
    <HeadlessMenu.Item onClick={props.onClick}>
      {
        (/* { active }: ItemRenderPropArg */) => (
          <div
            css={[listHoverable, itemStyle, !props.disableAutoDismiss && MenuItemPadding]}
            className={props.className}
          >
            {child}
          </div>
        )
      }
    </HeadlessMenu.Item>
  );
}

export const MenuItemPadding = tw`px-6 py-2`;

const itemStyle = tw`transition flex flex-row items-center border-none text-gray-1200 cursor-pointer w-full text-sm text-right`;
