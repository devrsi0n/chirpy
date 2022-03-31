/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { cardBg, listHoverable } from '$/styles/common';

import { easeInOut } from '../animation';
import { Box, BoxProps } from '../box';
import { Button, IconButton } from '../button';
import { Divider } from '../divider';

export type Shape = 'circle' | 'square';

export type MenuProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Menu({ className, children }: MenuProps): JSX.Element {
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length !== 2) {
    throw new Error('Menu should have exactly two children');
  }
  const items = childrenArray.find(
    (element) => (element as React.ReactElement).type === MenuItems,
  ) as React.ReactElement | undefined;
  const button = childrenArray.find(
    (element) => (element as React.ReactElement).type === MenuButton,
  ) as React.ReactElement | undefined;
  if (!items || !button) {
    throw new Error('Menu children should be a Menu.Items and a Menu.Button');
  }
  return (
    <div css={[tw`relative inline-block text-left`]} className={className}>
      <HeadlessMenu>
        {({ open }: { open: boolean }) => (
          <>
            {React.cloneElement(button, { open })}
            {React.cloneElement(items, { open })}
          </>
        )}
      </HeadlessMenu>
    </div>
  );
}

Menu.Button = MenuButton;
Menu.Items = MenuItems;
Menu.Item = MenuItem;
Menu.Divider = Divider;

export type MenuButtonProps = {
  children: React.ReactNode;
  shape?: Shape;
  className?: string;
  ariaLabel?: string;
  open?: boolean;
};

function MenuButton({
  shape = 'circle',
  ariaLabel = 'click to open the menu',
  className,
  open,
  children,
}: MenuButtonProps): JSX.Element {
  return (
    <div className={className}>
      <HeadlessMenu.Button as={shape === 'circle' ? IconButton : Button} aria-label={ariaLabel}>
        {children}
        {shape === 'square' && (
          <ChevronDown css={[tw`w-5 h-5 ml-2 -mr-1 transform`, open && tw`rotate-180`]} />
        )}
      </HeadlessMenu.Button>
    </div>
  );
}

export type MenuItemsProps = {
  children: React.ReactNode;
  open?: boolean;
  className?: string;
};

function MenuItems({ children, open, className }: MenuItemsProps): JSX.Element {
  return (
    <AnimatePresence>
      {open && (
        <m.div {...easeInOut}>
          <HeadlessMenu.Items
            static
            css={[
              tw`absolute right-0 mt-1 border rounded-md shadow-lg outline-none p-1 z-30`,
              cardBg,
            ]}
            className={className}
          >
            {children}
          </HeadlessMenu.Items>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export type MenuItemProps = React.PropsWithChildren<
  {
    disableAutoDismiss?: boolean;
  } & Pick<React.ComponentProps<typeof HeadlessMenu.Item>, 'onClick'>
> &
  BoxProps;

function MenuItem({
  as,
  children,
  disableAutoDismiss,
  onClick,
  ...asProps
}: MenuItemProps): JSX.Element {
  const child = disableAutoDismiss ? (
    <div onClick={(e) => disableAutoDismiss && e.stopPropagation()}>{children}</div>
  ) : (
    children
  );
  return (
    <HeadlessMenu.Item onClick={onClick}>
      {
        (/* { active }: ItemRenderPropArg */) => (
          <Box
            as={as}
            css={[listHoverable, itemStyle, spacingItem, !disableAutoDismiss && MenuItemPadding]}
            {...asProps}
          >
            {child}
          </Box>
        )
      }
    </HeadlessMenu.Item>
  );
}

export const MenuItemPadding = tw`px-6 py-2`;

const itemStyle = tw`transition flex flex-row items-center border-none text-gray-1200 cursor-pointer w-full text-sm text-right`;

const spacingItem = tw`mt-1`;
