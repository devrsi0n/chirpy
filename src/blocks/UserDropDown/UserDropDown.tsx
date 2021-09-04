import LogIn from '@geist-ui/react-icons/logIn';
import LogOut from '@geist-ui/react-icons/logOut';
import Monitor from '@geist-ui/react-icons/monitor';
import User from '@geist-ui/react-icons/user';
import { signOut } from 'next-auth/client';
import * as React from 'react';
import tw from 'twin.macro';

import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { Avatar } from '$/components/Avatar';
import { Divider } from '$/components/Divider';
import { DropDown } from '$/components/DropDown';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { Toggle } from '$/components/Toggle';
import { useSignIn } from '$/hooks/useSignIn';

export type UserDropDownProps = {
  variant: 'Widget' | 'Nav';
};

export function UserDropDown(props: UserDropDownProps): JSX.Element {
  const { isLogin, data } = useCurrentUser();
  const { avatar, name, username } = data;
  const [enableSubscribeComment, setEnableSubscribeComment] = React.useState(true);
  const [enableSubscribeSite, setEnableSubscribeSite] = React.useState(false);
  const handleSignIn = useSignIn();

  return (
    <DropDown
      classes={{
        button: tw`transform translate-x-2`,
      }}
      content={<Avatar src={avatar!} alt={`The avatar of ${name}`} />}
    >
      {name && (
        <div tw="px-6 py-2">
          <Text tw="flex justify-start" bold>
            {name}
          </Text>
        </div>
      )}
      {isLogin && <Divider />}
      {props.variant === 'Widget' &&
        (isLogin ? (
          <>
            <DropDown.Item>
              <Toggle
                label="Subscribe this comment"
                enabled={enableSubscribeComment}
                onChange={setEnableSubscribeComment}
                reverse
              />
            </DropDown.Item>
            <DropDown.Item>
              <Toggle
                label="Subscribe site comment"
                enabled={enableSubscribeSite}
                onChange={setEnableSubscribeSite}
                reverse
              />
            </DropDown.Item>
          </>
        ) : (
          <DropDown.Item css={itemStyle} onClick={handleSignIn}>
            <LogIn size={14} />
            <p tw="w-max">Sign in</p>
          </DropDown.Item>
        ))}
      {props.variant === 'Nav' && isLogin && (
        <>
          <DropDown.Item>
            <Link variant="plain" href={`/dashboard/${username}`} css={itemStyle}>
              <Monitor size={14} />
              <span>Dashboard</span>
            </Link>
          </DropDown.Item>
          <DropDown.Item>
            <Link variant="plain" href="/profile" css={itemStyle}>
              <User size={14} />
              <span>Profile</span>
            </Link>
          </DropDown.Item>
        </>
      )}
      {isLogin && (
        <>
          <Divider />
          <DropDown.Item css={itemStyle} onClick={() => signOut()}>
            <LogOut size={14} />
            <span tw="w-max">Log out</span>
          </DropDown.Item>
        </>
      )}
    </DropDown>
  );
}

const itemStyle = tw`flex flex-row justify-start items-center space-x-1`;
