import { Menu as HeadlessMenu } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { bluredBg, listHoverable } from '$/styles/common';

import { easeInOut } from '../animation';
import { Box, BoxProps } from '../box';
import { Button, IconButton } from '../button';
import { Divider } from '../divider';
import { IconChevronDown } from '../icons';

export type Shape = 'circle' | 'square';

export type MenuProps = React.PropsWithChildren<{
  className?: string;
}>;

const ERROR = new Error(
  'Menu children only accept a Menu.Items and a Menu.Button',
);

export function Menu({ className, children }: MenuProps): JSX.Element {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement[];
  if (childrenArray.length !== 2) {
    throw ERROR;
  }
  const items = childrenArray.find((element) => element.type === MenuItems) as
    | React.ReactElement
    | undefined;
  const button = childrenArray.find(
    (element) => element.type === MenuButton,
  ) as React.ReactElement | undefined;
  if (!items || !button) {
    throw ERROR;
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
  onClick?(open?: boolean): void;
};

function MenuButton({
  shape = 'circle',
  ariaLabel = 'click to open the menu',
  className,
  open,
  onClick,
  children,
}: MenuButtonProps): JSX.Element {
  return (
    <div className={className}>
      <HeadlessMenu.Button
        as={shape === 'circle' ? IconButton : Button}
        aria-label={ariaLabel}
        onClick={() => onClick?.(open)}
      >
        {children}
        {shape === 'square' && (
          <IconChevronDown
            className={clsx(`ml-2 -mr-1 h-5 w-5`, open && `rotate-180`)}
          />
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
              `absolute right-0 z-30 mt-1 rounded-md border p-1 shadow-md outline-none`,
              bluredBg,
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

export type MenuItemProps = React.PropsWithChildren<{
  disableAutoDismiss?: boolean;
  onClick?: () => void;
}> &
  BoxProps;

function MenuItem({
  as,
  children,
  disableAutoDismiss,
  onClick,
  className,
  ...asProps
}: MenuItemProps): JSX.Element {
  const child = disableAutoDismiss ? (
    <div onClick={(e) => disableAutoDismiss && e.stopPropagation()}>
      {children}
    </div>
  ) : (
    children
  );
  return (
    <HeadlessMenu.Item>
      {
        (/* { active }: ItemRenderPropArg */) => (
          <Box
            as={as}
            onClick={onClick}
            className={clsx(
              listHoverable,
              itemStyle,
              !disableAutoDismiss && MenuItemPadding,
              className,
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
