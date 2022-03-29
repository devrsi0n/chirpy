import Bell from '@geist-ui/react-icons/bell';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { Avatar } from '$/components/avatar';
import { Divider } from '$/components/divider';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Popover } from '$/components/popover';
import { Text } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useCurrentNotificationMessagesQuery } from '$/graphql/generated/notification';
import { NotificationType_Enum } from '$/graphql/generated/types';
import { dayjs } from '$/utilities/date';

export function NotificationHub(): JSX.Element {
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
        styles={{
          panel: tw`px-0`,
        }}
        content={
          <div tw="space-y-5 w-max">
            <Heading as="h4" tw="font-bold px-5">
              Notifications
            </Heading>
            {(data?.notificationMessages.length || 0) > 0 ? (
              <ul tw="">
                {data?.notificationMessages.map((msg, index) => (
                  <li key={msg.id} tw="px-5 pt-3" css={[!msg.read && tw`bg-gray-300`]}>
                    <Link
                      href={msg.url}
                      variant="plain"
                      tw="flex flex-row items-start space-x-2 mb-2"
                    >
                      <Avatar src={msg.triggeredBy.avatar} />
                      <div>
                        <Text tw="flex flex-row space-x-1.5 leading-none">
                          <span tw="font-bold">{msg.triggeredBy.name}</span>
                          <span>{titleMap[msg.type]}</span>
                        </Text>
                        <Text
                          variant="secondary"
                          as="time"
                          size="xs"
                          tw="block leading-none cursor-default mt-1"
                          dateTime={msg.createdAt}
                        >
                          {dayjs(msg.createdAt).fromNow()}
                        </Text>
                        {msg.content && <Text tw="max-w-[15rem] mt-2">{msg.content}</Text>}
                      </div>
                    </Link>
                    {index < data?.notificationMessages.length - 1 && <Divider />}
                  </li>
                ))}
              </ul>
            ) : (
              <Text>No messages</Text>
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
