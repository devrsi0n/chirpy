import { SUPPORT_LINK, SIGN_IN_SUCCESS_KEY } from '@chirpy-dev/utils';
import { signOut } from 'next-auth/react';
import * as React from 'react';

import { Avatar } from '../../components/avatar';
import { IconLifeBuoy, IconLogOut, IconUser } from '../../components/icons';
import { Menu } from '../../components/menu';
import { useCurrentUser } from '../../contexts/current-user-context';
import { itemStyle, MenuLink } from './menu-link';

export async function handleSignOut() {
  await signOut();
  localStorage.removeItem(SIGN_IN_SUCCESS_KEY);
}

export function UserMenu(): JSX.Element {
  const { isSignIn, data } = useCurrentUser();
  const { image, name, email, username } = data;

  return (
    <Menu>
      <Menu.Button>
        <Avatar
          src={image}
          alt={`${name || username}'s avatar`}
          email={email}
          name={name}
          username={username}
          showLabel
        />
      </Menu.Button>
      <Menu.Items className="min-w-[200px]" align="start">
        <Menu.Item
          as={MenuLink}
          align="start"
          variant="plain"
          target="_blank"
          href={SUPPORT_LINK}
        >
          <IconLifeBuoy size={14} />
          <span>Support</span>
        </Menu.Item>
        {isSignIn && (
          <>
            <Menu.Item
              as={MenuLink}
              align="start"
              variant="plain"
              href="/profile"
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
              onClick={handleSignOut}
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
