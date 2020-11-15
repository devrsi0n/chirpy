import { Avatar } from '$/components/Avatar';
import { DropDownMenu } from '$/components/buttons/DropDownMenu';
import * as React from 'react';
import LogOut from '@geist-ui/react-icons/logOut';
import { useRouter } from 'next/router';
import { Toggle } from '$/components/Toggle';
import { Divider } from '$/components/Divider';

export type DropDownUserProps = {
  avatar: string;
  name: string;
};

export function DropDownUser(props: DropDownUserProps): JSX.Element {
  const router = useRouter();
  const handleClickLogOut = React.useCallback(() => {
    const url = new URL('/api/auth/logout', process.env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set('redirectURL', window.location.href);
    router.push(url.toString());
  }, [router]);
  const [enableSubscribeComment, setEnableSubscribeComment] = React.useState(true);
  const [enableSubscribeSite, setEnableSubscribeSite] = React.useState(false);
  return (
    <DropDownMenu content={<Avatar src={props.avatar} alt={`The avatar of ${props.name}`} />}>
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
      <DropDownMenu.Item className="justify-end space-x-2" onClick={handleClickLogOut}>
        <LogOut />
        <span>Logout</span>
      </DropDownMenu.Item>
    </DropDownMenu>
  );
}
