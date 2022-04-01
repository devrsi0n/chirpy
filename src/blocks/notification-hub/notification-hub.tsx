import Bell from '@geist-ui/react-icons/bell';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/avatar';
import { Divider } from '$/components/divider';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Menu } from '$/components/menu';
import { Text, TextProps } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useCurrentNotificationMessagesQuery } from '$/graphql/generated/notification';
import { NotificationType_Enum } from '$/graphql/generated/types';
import { dayjs } from '$/utilities/date';

import styles from './notification-hub.module.scss';

export function NotificationHub(): JSX.Element {
  const { data: userData } = useCurrentUser();
  const [{ data }] = useCurrentNotificationMessagesQuery({
    variables: {
      userId: userData.id || '-1',
    },
  });
  return (
    <div tw="flex flex-row justify-center items-center mr-4">
      <Menu>
        <Menu.Button className={styles.menuButton}>
          <Bell size={22} />
        </Menu.Button>
        <Menu.Items className={styles.menuItems}>
          <Heading as="h4" tw="font-bold px-5 pb-3">
            Notifications
          </Heading>
          {data?.notificationMessages?.map((msg, index) => (
            <Menu.Item
              key={msg.id}
              tw="px-5 pt-3 pb-0 mt-0 rounded-none hover:(rounded) flex-col items-start text-left"
              css={[!msg.read && tw`bg-gray-200`]}
            >
              <Link
                href={msg.url}
                variant="plain"
                tw="flex flex-row items-start space-x-2 mb-2"
                className="group"
              >
                <Avatar src={msg.triggeredBy.avatar} />
                <div>
                  <NotificationText tw="flex flex-row space-x-1.5 leading-none">
                    <span tw="font-bold">{msg.triggeredBy.name}</span>
                    <span>{titleMap[msg.type]}</span>
                  </NotificationText>
                  <NotificationText
                    variant="secondary"
                    as="time"
                    size="xs"
                    tw="block leading-none cursor-default mt-1"
                    dateTime={msg.createdAt}
                  >
                    {dayjs(msg.createdAt).fromNow()}
                  </NotificationText>
                  {msg.content && (
                    <NotificationText tw="max-w-[15rem] mt-2 italic">
                      {msg.content}
                    </NotificationText>
                  )}
                </div>
              </Link>
              {index < data?.notificationMessages.length - 1 && (
                <Divider tw="w-full group-hover:(bg-primary-400)" />
              )}
            </Menu.Item>
          )) || <Text>No messages</Text>}
        </Menu.Items>
      </Menu>
    </div>
  );
}

function NotificationText(props: TextProps): JSX.Element {
  return <Text {...props} tw="group-hover:text-primary-1100" />;
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'left a comment',
  ReceivedAReply: 'replied to your comment',
  ReceivedALike: 'liked your comment',
  CommentDeleted: 'deleted your comment',
};
