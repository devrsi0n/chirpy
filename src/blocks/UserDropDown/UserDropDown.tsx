import LogOut from '@geist-ui/react-icons/logOut';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { Divider } from '$/components/Divider';
import { DropDownMenu } from '$/components/DropDownMenu';
import { Toggle } from '$/components/Toggle';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { useLogout } from '$/hooks/useLogout';

import { SignInButton } from '../SignInButton';

export type UserDropDownProps = {
  //
};

export function UserDropDown(props: UserDropDownProps): JSX.Element {
  const { isLogin, avatar, displayName } = useCurrentUser();
  const handleClickLogOut = useLogout();
  const [enableSubscribeComment, setEnableSubscribeComment] = React.useState(true);
  const [enableSubscribeSite, setEnableSubscribeSite] = React.useState(false);

  return (
    <>
      {isLogin ? (
        <DropDownMenu
          classes={{
            button: tw`transform translate-x-3`,
          }}
          content={<Avatar src={avatar} alt={`The avatar of ${displayName}`} />}
        >
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
          <Divider />
          <DropDownMenu.Item tw="justify-end space-x-2" onClick={handleClickLogOut}>
            <LogOut size={14} />
            <span>Logout</span>
          </DropDownMenu.Item>
        </DropDownMenu>
      ) : (
        <SignInButton variant="plain" />
      )}
    </>
  );
}
