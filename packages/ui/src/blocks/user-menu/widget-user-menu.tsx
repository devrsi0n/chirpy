import { SUPPORT_LINK, SIGN_IN_SUCCESS_KEY } from '@chirpy-dev/utils';
import { signOut } from 'next-auth/react';
import * as React from 'react';

import { Avatar } from '../../components/avatar';
import {
  IconLifeBuoy,
  IconLogIn,
  IconLogOut,
  IconUser,
} from '../../components/icons';
import { Menu } from '../../components/menu';
import { Text } from '../../components/text';
import { useCurrentUser } from '../../contexts/current-user-context';
import { useSignInWindow } from '../../hooks/use-sign-in-window';
import { itemStyle, MenuLink } from './menu-link';

export function WidgetUserMenu(): JSX.Element {
  const { isSignIn, data } = useCurrentUser();
  const { image, name, email, username } = data;
  const handleSignIn = useSignInWindow();

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
      <Menu.Items>
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
        {isSignIn ? (
          <></>
        ) : (
          <Menu.Item
            as="div"
            align="start"
            className={itemStyle}
            onClick={handleSignIn}
            disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
          >
            <IconLogIn size={14} />
            <p className="w-max">Sign in</p>
          </Menu.Item>
        )}
        <Menu.Item
          as={MenuLink}
          align="start"
          variant="plain"
          target="_blank"
          href={SUPPORT_LINK}
        >
          <IconLifeBuoy size={14} />
          <span>Feedback</span>
        </Menu.Item>
        {isSignIn && (
          <>
            <Menu.Item
              as={MenuLink}
              align="start"
              variant="plain"
              href="/profile"
              target={'_blank'}
            >
              <IconUser size={14} />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              as="div"
              align="start"
              disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
              className={itemStyle}
              onClick={async () => {
                await signOut({
                  redirect: false,
                });
                localStorage.removeItem(SIGN_IN_SUCCESS_KEY);
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
