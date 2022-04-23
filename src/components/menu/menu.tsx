import ChevronDown from '@geist-ui/react-icons/chevronDown';
import { Menu as HeadlessMenu } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

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
    <div className={clsx('relative inline-block text-left', className)}>
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
          <ChevronDown className={clsx(`w-5 h-5 ml-2 -mr-1`, open && `rotate-180`)} />
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
            className={clsx(
              `absolute right-0 mt-1 border rounded-md shadow-lg outline-none p-1 z-30`,
              cardBg,
              className,
            )}
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
            className={clsx(
              listHoverable,
              itemStyle,
              spacingItem,
              !disableAutoDismiss && MenuItemPadding,
            )}
            {...asProps}
          >
            {child}
          </Box>
        )
      }
    </HeadlessMenu.Item>
  );
}

export const MenuItemPadding = `px-6 py-2`;

const itemStyle = `transition flex flex-row items-center border-none text-gray-1200 cursor-pointer w-full text-sm text-right`;

const spacingItem = `mt-1`;
