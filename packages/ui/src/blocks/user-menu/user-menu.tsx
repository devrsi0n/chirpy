import {
  FEEDBACK_LINK,
  SIGN_IN_SUCCESS_KEY,
  GRAPHQL_CACHE_DB_NAME,
} from '@chirpy-dev/utils';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import * as React from 'react';

import { Avatar } from '../../components/avatar';
import {
  IconLifeBuoy,
  IconLogIn,
  IconLogOut,
  IconMonitor,
  IconUser,
} from '../../components/icons';
import { Link, LinkProps } from '../../components/link';
import { Menu } from '../../components/menu';
import { Text } from '../../components/text';
import { useCurrentUser } from '../../contexts/current-user-context';
import { useSignInWindow } from '../../hooks/use-sign-in-window';

export type UserMenuProps = {
  variant: 'Widget' | 'Nav';
};

export function UserMenu(props: UserMenuProps): JSX.Element {
  const { isSignIn, data } = useCurrentUser();
  const { image, name, email, username } = data;
  const handleSignIn = useSignInWindow();
  const isWidget = props.variant === 'Widget';
  const isNav = props.variant === 'Nav';

  return (
    <Menu>
      <Menu.Button>
        <Avatar
          src={image}
          alt={`${name || username}'s avatar`}
          email={email}
          name={name}
          username={username}
        />
      </Menu.Button>
      <Menu.Items className="">
        {name && (
          <div className="mx-6 py-2">
            <Text className="w-36 text-left line-clamp-2" bold>
              {name}
            </Text>
            {email && (
              <Text
                variant="secondary"
                className="w-36 break-words text-left line-clamp-2"
                size="sm"
              >
                {email}
              </Text>
            )}
          </div>
        )}
        {isSignIn && <Menu.Divider />}
        {isWidget &&
          (isSignIn ? (
            <></>
          ) : (
            <Menu.Item
              as="div"
              className={itemStyle}
              onClick={handleSignIn}
              disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
            >
              <IconLogIn size={14} />
              <p className="w-max">Sign in</p>
            </Menu.Item>
          ))}
        <Menu.Item
          as={MenuLink}
          variant="plain"
          target="_blank"
          href={FEEDBACK_LINK}
        >
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
              as="div"
              disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
              className={itemStyle}
              onClick={async () => {
                await signOut({
                  redirect: !isWidget,
                });
                localStorage.removeItem(SIGN_IN_SUCCESS_KEY);
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
