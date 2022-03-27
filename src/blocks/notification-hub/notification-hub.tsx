import Bell from '@geist-ui/react-icons/bell';
import * as React from 'react';
import 'twin.macro';

import { Avatar } from '$/components/avatar';
import { Heading } from '$/components/heading';
import { Popover } from '$/components/popover';
import { Text } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useCurrentNotificationMessagesQuery } from '$/graphql/generated/notification';
import { NotificationType_Enum } from '$/graphql/generated/types';
import { dayjs } from '$/utilities/date';

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
        placement="bottomEnd"
        content={
          <div tw="p-3 space-y-3">
            <Heading as="h4" tw="">
              Notifications
            </Heading>
            {(data?.notificationMessages.length || 0) > 0 ? (
              data?.notificationMessages.map((msg) => (
                <div key={msg.id} tw="flex flex-row items-center space-x-2">
                  <Avatar src={msg.triggeredBy.avatar} />
                  <div>
                    <Text tw="flex flex-row">
                      <span>{msg.triggeredBy.name}</span>
                      <span>{titleMap[msg.type]}</span>
                    </Text>
                    <Text
                      variant="secondary"
                      as="time"
                      size="xs"
                      title={msg.createdAt}
                      tw="block leading-none cursor-default"
                      dateTime={msg.createdAt}
                    >
                      {dayjs(msg.createdAt).fromNow()}
                    </Text>
                  </div>
                </div>
              ))
            ) : (
              <div>No messages</div>
            )}
          </div>
        }
      >
        <Bell size={20} />
      </Popover>
    </div>
  );
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'left a comment',
  ReceivedAReply: 'replied to your comment',
  ReceivedALike: 'liked your comment',
  CommentDeleted: 'deleted your comment',
};
