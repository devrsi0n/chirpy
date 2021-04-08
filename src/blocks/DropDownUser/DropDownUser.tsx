import LogOut from '@geist-ui/react-icons/logOut';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { Divider } from '$/components/Divider';
import { DropDownMenu } from '$/components/DropDownMenu';
import { Toggle } from '$/components/Toggle';
import { LOG_OUT_SUCCESS_KEY } from '$/lib/constants';

export type DropDownUserProps = {
  avatar?: string;
  name?: string;
};

export function DropDownUser(props: DropDownUserProps): JSX.Element {
  const handleClickLogOut = React.useCallback(() => {
    fetch('/api/auth/logout').then(() => {
      window.localStorage.setItem(LOG_OUT_SUCCESS_KEY, 'true');
    });
  }, []);
  const [enableSubscribeComment, setEnableSubscribeComment] = React.useState(true);
  const [enableSubscribeSite, setEnableSubscribeSite] = React.useState(false);
  return (
    <DropDownMenu
      classes={{
        button: tw`transform translate-x-3`,
      }}
      content={<Avatar src={props.avatar} alt={`The avatar of ${props.name}`} />}
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
  );
}
