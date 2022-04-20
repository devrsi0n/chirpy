import HeartFill from '@geist-ui/react-icons/heartFill';
import MessageSquare from '@geist-ui/react-icons/messageSquare';
import X from '@geist-ui/react-icons/x';
import XSquare from '@geist-ui/react-icons/xSquare';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/avatar';
import { Divider } from '$/components/divider';
import { Link } from '$/components/link';
import { Menu } from '$/components/menu';
import { Text, TextProps } from '$/components/text';
import { CurrentNotificationMessagesSubscription } from '$/graphql/generated/notification';
import { NotificationType_Enum } from '$/graphql/generated/types';
import { dayjs } from '$/utilities/date';

export type INotificationItemProps = {
  index: number;
  /**
   * Message array total length
   */
  length: number;
  message: CurrentNotificationMessagesSubscription['notificationMessages'][number];
  onClickCapture: (messageId: string) => void;
  onClickDelete: (messageId: string) => void;
};

export function NotificationItem({
  index,
  message,
  length,
  onClickCapture,
  onClickDelete,
}: INotificationItemProps): JSX.Element {
  const deleteButtonRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Menu.Item
      key={message.id}
      tw="px-5 pt-3 pb-0 mt-0 rounded-none hover:(rounded) flex-col items-start text-left"
      css={[!message.read && tw`bg-gray-200`]}
      onClickCapture={(e: any): void => {
        if (deleteButtonRef.current?.contains(e.target)) {
          e.preventDefault();
          return;
        }
        onClickCapture(message.id);
      }}
    >
      <Link
        href={message.url}
        variant="plain"
        tw="w-full flex flex-row items-start space-x-2 mb-2"
        className="group"
      >
        {ICON_MAP[message.type]}
        <div tw="flex-1">
          <div tw="flex flex-row justify-between">
            <Avatar src={message.triggeredBy.avatar} tw="mb-2" />
            <button
              type="button"
              tw="hidden group-hover:(inline) hover:(bg-primary-600) rounded-full h-fit p-1"
              onClick={(e) => {
                onClickDelete(message.id);
                e.stopPropagation();
              }}
              ref={deleteButtonRef}
              aria-label="Delete the notification message"
            >
              <X size={22} />
            </button>
          </div>
          <NotificationText tw="flex flex-row space-x-1.5 leading-none">
            <span tw="font-bold max-w-[8rem] truncate">{message.triggeredBy.name}</span>
            <span>{TITLE_MAP[message.type]}</span>
          </NotificationText>
          <NotificationText
            variant="secondary"
            as="time"
            size="sm"
            tw="block leading-none cursor-default mt-1"
            dateTime={message.createdAt}
          >
            {dayjs(message.createdAt).fromNow()}
          </NotificationText>
          {message.content && (
            <NotificationText
              size="sm"
              tw="max-w-[15rem] mt-2 truncate"
              variant="secondary"
              title={message.content}
              aria-label="Comment content"
            >
              {message.content}
            </NotificationText>
          )}
        </div>
      </Link>
      {index < length - 1 && <Divider tw="w-full group-hover:(bg-primary-400)" />}
    </Menu.Item>
  );
}

function NotificationText(props: TextProps): JSX.Element {
  return <Text {...props} tw="group-hover:text-primary-1100" />;
}

const TITLE_MAP: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'left a comment',
  ReceivedAReply: 'replied to your comment',
  ReceivedALike: 'liked your comment',
  CommentDeleted: 'deleted your comment',
};

const ICON_SIZE = 24;
const COMMENT_ICON = (
  <span tw="text-blue-900 group-hover:(text-primary-900)">
    <MessageSquare size={ICON_SIZE} tw="transform -scale-x-1" />
  </span>
);

const ICON_MAP: Record<NotificationType_Enum, JSX.Element> = {
  ReceivedAComment: COMMENT_ICON,
  ReceivedAReply: COMMENT_ICON,
  ReceivedALike: (
    <span tw="text-pink-900 group-hover:(text-primary-900)">
      <HeartFill size={ICON_SIZE} />
    </span>
  ),
  CommentDeleted: (
    <span tw="text-gray-900 group-hover:(text-primary-900)">
      <XSquare size={ICON_SIZE} />
    </span>
  ),
};
