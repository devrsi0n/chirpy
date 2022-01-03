import LifeBuoy from '@geist-ui/react-icons/lifeBuoy';
import LogIn from '@geist-ui/react-icons/logIn';
import LogOut from '@geist-ui/react-icons/logOut';
import Monitor from '@geist-ui/react-icons/monitor';
import User from '@geist-ui/react-icons/user';
import { signOut } from 'next-auth/react';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { Divider } from '$/components/Divider';
import { Link } from '$/components/Link';
import { Menu } from '$/components/Menu';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { useSignInWindow } from '$/hooks/useSignInWindow';
import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

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
    <Menu content={<Avatar src={avatar!} alt={`The avatar of ${name}`} />}>
      {name && (
        <div tw="px-6 py-2">
          <Text tw="flex justify-start" bold>
            {name}
          </Text>
        </div>
      )}
      {isSignIn && <Divider />}
      {isWidget &&
        (isSignIn ? (
          <></>
        ) : (
          <Menu.Item css={itemStyle} onClick={handleSignIn}>
            <LogIn size={14} />
            <p tw="w-max">Sign in</p>
          </Menu.Item>
        ))}
      <Menu.Item>
        <Link
          variant="plain"
          href="https://github.com/devrsi0n/chirpy/issues/new/choose"
          css={itemStyle}
        >
          <LifeBuoy size={14} />
          <span>Feedback</span>
        </Link>
      </Menu.Item>
      {isSignIn && (
        <>
          {isNav && (
            <Menu.Item>
              <Link variant="plain" href="/dashboard" css={itemStyle}>
                <Monitor size={14} />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item>
            <Link
              variant="plain"
              href="/profile"
              css={itemStyle}
              target={isWidget ? '_blank' : undefined}
            >
              <User size={14} />
              <span>Profile</span>
            </Link>
          </Menu.Item>
          <Divider />
          <Menu.Item
            css={itemStyle}
            onClick={() => {
              localStorage.removeItem(LOG_IN_SUCCESS_KEY);
              signOut({
                redirect: !isWidget,
              });
            }}
          >
            <LogOut size={14} />
            <span tw="w-max">Log out</span>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

const itemStyle = tw`flex flex-row justify-start items-center space-x-1`;
