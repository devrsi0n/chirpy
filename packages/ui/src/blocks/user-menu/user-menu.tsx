import { SIGN_IN_SUCCESS_KEY, SUPPORT_LINK } from '@chirpy-dev/utils';
import { signOut } from 'next-auth/react';

import { Avatar } from '../../components/avatar';
import { IconLifeBuoy, IconLogOut, IconUser } from '../../components/icons';
import { Menu } from '../../components/menu';
import { useCurrentUser } from '../../contexts/current-user-context';
import { MenuLink } from './menu-link';

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
          variant="plain"
          target="_blank"
          href={SUPPORT_LINK}
        >
          <IconLifeBuoy size={14} />
          <span>Support</span>
        </Menu.Item>
        {isSignIn && (
          <>
            <Menu.Item as={MenuLink} variant="plain" href="/profile">
              <IconUser size={14} />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
              onClick={handleSignOut}
            >
              <IconLogOut size={14} />
              <span>Log out</span>
            </Menu.Item>
          </>
        )}
      </Menu.Items>
    </Menu>
  );
}
