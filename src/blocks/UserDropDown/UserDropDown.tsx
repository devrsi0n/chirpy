import LogIn from '@geist-ui/react-icons/logIn';
import LogOut from '@geist-ui/react-icons/logOut';
import Monitor from '@geist-ui/react-icons/monitor';
import User from '@geist-ui/react-icons/user';
import { signOut } from 'next-auth/react';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { Divider } from '$/components/Divider';
import { DropDown } from '$/components/DropDown';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { useSignIn } from '$/hooks/useSignIn';
import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

export type UserDropDownProps = {
  variant: 'Widget' | 'Nav';
};

export function UserDropDown(props: UserDropDownProps): JSX.Element {
  const { isSignIn, data } = useCurrentUser();
  const { avatar, name } = data;
  const handleSignIn = useSignIn();
  const isWidget = props.variant === 'Widget';
  const isNav = props.variant === 'Nav';

  return (
    <DropDown content={<Avatar src={avatar!} alt={`The avatar of ${name}`} />}>
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
          <DropDown.Item css={itemStyle} onClick={handleSignIn}>
            <LogIn size={14} />
            <p tw="w-max">Sign in</p>
          </DropDown.Item>
        ))}
      {isSignIn && (
        <>
          {isNav && (
            <DropDown.Item>
              <Link variant="plain" href="/dashboard" css={itemStyle}>
                <Monitor size={14} />
                <span>Dashboard</span>
              </Link>
            </DropDown.Item>
          )}
          <DropDown.Item>
            <Link
              variant="plain"
              href="/profile"
              css={itemStyle}
              target={isWidget ? '_blank' : undefined}
            >
              <User size={14} />
              <span>Profile</span>
            </Link>
          </DropDown.Item>
          <Divider />
          <DropDown.Item
            css={itemStyle}
            onClick={() => {
              localStorage.removeItem(LOG_IN_SUCCESS_KEY);
              signOut();
            }}
          >
            <LogOut size={14} />
            <span tw="w-max">Log out</span>
          </DropDown.Item>
        </>
      )}
    </DropDown>
  );
}

const itemStyle = tw`flex flex-row justify-start items-center space-x-1`;
