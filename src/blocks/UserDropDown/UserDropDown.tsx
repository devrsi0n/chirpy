import { User } from '@geist-ui/react-icons';
import LogIn from '@geist-ui/react-icons/logIn';
import LogOut from '@geist-ui/react-icons/logOut';
import Monitor from '@geist-ui/react-icons/monitor';
import { signOut } from 'next-auth/client';
import * as React from 'react';
import tw from 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { Avatar } from '$/components/Avatar';
import { Divider } from '$/components/Divider';
import { DropDownMenu } from '$/components/DropDownMenu';
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
    <>
      <DropDownMenu
        classes={{
          button: tw`transform translate-x-3`,
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
              <DropDownMenu.Item>
                <Toggle
                  label="Subscribe this comment"
                  enabled={enableSubscribeComment}
                  onChange={setEnableSubscribeComment}
                  reverse
                />
              </DropDownMenu.Item>
              <DropDownMenu.Item>
                <Toggle
                  label="Subscribe site comment"
                  enabled={enableSubscribeSite}
                  onChange={setEnableSubscribeSite}
                  reverse
                />
              </DropDownMenu.Item>
            </>
          ) : (
            <DropDownMenu.Item css={itemStyle} onClick={handleSignIn}>
              <LogIn size={14} />
              <p tw="w-max">Sign in</p>
            </DropDownMenu.Item>
          ))}
        {props.variant === 'Nav' && isLogin && (
          <>
            <DropDownMenu.Item>
              <Link variant="plain" href={`/dashboard/${username}`} css={itemStyle}>
                <Monitor size={14} />
                <span>Dashboard</span>
              </Link>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <Link variant="plain" href="/profile" css={itemStyle}>
                <User size={14} />
                <span>Profile</span>
              </Link>
            </DropDownMenu.Item>
          </>
        )}
        {isLogin && (
          <>
            <Divider />
            <DropDownMenu.Item css={itemStyle} onClick={() => signOut()}>
              <LogOut size={14} />
              <span tw="w-max">Log out</span>
            </DropDownMenu.Item>
          </>
        )}
      </DropDownMenu>
    </>
  );
}

const itemStyle = tw`flex flex-row justify-start items-center space-x-1`;
