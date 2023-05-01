import { isENVProd } from '@chirpy-dev/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import * as React from 'react';

import { bluredBg, listHoverable } from '../../styles/common';
import { Box, BoxProps } from '../box';
import { Button, IconButton } from '../button';
import { Divider } from '../divider';
import styles from './menu.module.scss';

export type Shape = 'circle' | 'square';

export type MenuProps = React.PropsWithChildren<{
  className?: string;
}>;

const ERROR = new Error(
  'Menu children only accept a Menu.Items and a Menu.Button',
);

export function Menu({ children }: MenuProps): JSX.Element {
  if (!isENVProd) {
    const childrenArray = React.Children.toArray(
      children,
    ) as React.ReactElement[];
    if (childrenArray.length !== 2) {
      throw ERROR;
    }
    const items = childrenArray.find(
      (element) => element.type === MenuItems,
    ) as React.ReactElement | undefined;
    const button = childrenArray.find(
      (element) => element.type === MenuButton,
    ) as React.ReactElement | undefined;
    if (!items || !button) {
      throw ERROR;
    }
  }
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
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
  ...buttonProps
}: MenuButtonProps): JSX.Element {
  const AsButton = shape === 'circle' ? IconButton : Button;
  return (
    <div className={className}>
      <DropdownMenu.Trigger asChild>
        <AsButton
          {...buttonProps}
          aria-label={ariaLabel}
          onClick={() => onClick?.(open)}
        >
          {children}
        </AsButton>
      </DropdownMenu.Trigger>
    </div>
  );
}

export type MenuItemsProps = {
  children: React.ReactNode;
  className?: string;
} & DropdownMenu.DropdownMenuContentProps;

function MenuItems({
  children,
  className,
  ...contentProps
}: MenuItemsProps): JSX.Element {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={clsx(
          styles.dropdownMenuContent,
          bluredBg,
          `rounded-md p-1`,
          className,
        )}
        sideOffset={5}
        {...contentProps}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

export type MenuItemProps = {
  disableAutoDismiss?: boolean;
  disabled?: boolean;
} & BoxProps;

function MenuItem({
  as,
  children,
  disableAutoDismiss,
  disabled,
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
    <DropdownMenu.Item
      disabled={disabled}
      className="data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <Box
        as={as}
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
    </DropdownMenu.Item>
  );
}

export const MenuItemPadding = `px-4 py-3`;

const itemStyle = `font-medium transition flex flex-row items-center border-none text-gray-1200 cursor-pointer w-full text-sm text-right gap-2`;
