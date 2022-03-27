import Bell from '@geist-ui/react-icons/bell';
import * as React from 'react';
import 'twin.macro';

import { IconButton } from '$/components/button';
import { Popover } from '$/components/popover';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useCurrentNotificationMessagesQuery } from '$/graphql/generated/notification';

export type INotificationHubProps = {
  // children: React.ReactElement;
};

export function NotificationHub(props: INotificationHubProps): JSX.Element {
  const { data: userData } = useCurrentUser();
  const [{ data }] = useCurrentNotificationMessagesQuery({
    variables: {
      userId: userData.id || '-1',
    },
  });
  return (
    <div tw="flex flex-row items-center mr-4">
      <Popover
        placement="bottom"
        content={
          <div>
            {data?.notificationMessages ? (
              data?.notificationMessages.map((msg) => <div key={msg.id}>{msg.recipient.name}</div>)
            ) : (
              <div>No messages</div>
            )}
          </div>
        }
      >
        <IconButton tw="">
          <Bell size={20} />
        </IconButton>
      </Popover>
    </div>
  );
}
