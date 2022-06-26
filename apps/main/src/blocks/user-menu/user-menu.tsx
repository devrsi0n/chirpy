import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import * as React from 'react';

import { Avatar } from '$/components/avatar';
import {
  IconLifeBuoy,
  IconLogIn,
  IconLogOut,
  IconMonitor,
  IconUser,
} from '$/components/icons';
import { Link, LinkProps } from '$/components/link';
import { Menu } from '$/components/menu';
import { Text } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context';
import { useSignInWindow } from '$/hooks/use-sign-in-window';
import {
  FEEDBACK_LINK,
  LOG_IN_SUCCESS_KEY,
  GRAPHQL_CACHE_DB_NAME,
} from '$/lib/constants';

export type UserMenuProps = {
  variant: 'Widget' | 'Nav';
};

export function UserMenu(props: UserMenuProps): JSX.Element {
  const { isSignIn, data } = useCurrentUser();
  const { avatar, name } = data;
  const handleSignIn = useSignInWindow();
  const isWidget = props.variant === 'Widget';
  const isNav = props.variant === 'Nav';

  return (
    <Menu>
      <Menu.Button>
        <Avatar src={avatar || ''} alt={`The avatar of ${name}`} />
      </Menu.Button>
      <Menu.Items>
        {name && (
          <div className="px-6 py-2">
            <Text className="flex justify-start" bold>
              {name}
            </Text>
          </div>
        )}
        {isSignIn && <Menu.Divider />}
        {isWidget &&
          (isSignIn ? (
            <></>
          ) : (
            <Menu.Item className={itemStyle} onClick={handleSignIn}>
              <IconLogIn size={14} />
              <p className="w-max">Sign in</p>
            </Menu.Item>
          ))}
        <Menu.Item as={MenuLink} variant="plain" href={FEEDBACK_LINK}>
          <IconLifeBuoy size={14} />
          <span>Feedback</span>
        </Menu.Item>
        {isSignIn && (
          <>
            {isNav && (
              <Menu.Item as={MenuLink} variant="plain" href="/dashboard">
                <IconMonitor size={14} />
                <span>Dashboard</span>
              </Menu.Item>
            )}
            <Menu.Item
              as={MenuLink}
              variant="plain"
              href="/profile"
              target={isWidget ? '_blank' : undefined}
            >
              <IconUser size={14} />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              className={itemStyle}
              onClick={async () => {
                await signOut({
                  redirect: !isWidget,
                });
                localStorage.removeItem(LOG_IN_SUCCESS_KEY);
                indexedDB.deleteDatabase(GRAPHQL_CACHE_DB_NAME);
              }}
            >
              <IconLogOut size={14} />
              <span className="w-max">Log out</span>
            </Menu.Item>
          </>
        )}
      </Menu.Items>
    </Menu>
  );
}

const MenuLink = React.forwardRef(function MenuLink(
  { className, ...restProps }: LinkProps,
  ref: React.Ref<HTMLAnchorElement>,
): JSX.Element {
  return (
    <Link ref={ref} {...restProps} className={clsx(itemStyle, className)} />
  );
});

const itemStyle = `justify-start space-x-1`;
