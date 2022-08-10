import clsx from 'clsx';
import * as React from 'react';

import { Avatar } from '$/components/avatar';
import { Divider } from '$/components/divider';
import {
  IconHeartFill,
  IconMessageSquare,
  IconX,
  IconXSquare,
} from '$/components/icons';
import { Link } from '$/components/link';
import { Menu } from '$/components/menu';
import { Text, TextProps } from '$/components/text';
import { CurrentNotificationMessagesSubscription } from '$/graphql/generated/notification';
import { NotificationType_Enum } from '$/graphql/generated/types';
import { useIsWidget } from '$/hooks/use-is-widget';
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
  const isWidget = useIsWidget();
  return (
    <Menu.Item
      key={message.id}
      className={clsx(
        'mt-0 flex-col items-start rounded-none px-5 pt-3 pb-0 !text-left hover:rounded',
        !message.read && `bg-gray-600/30`,
      )}
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
        className="group mb-2 flex w-full flex-row items-start space-x-2"
        target={isWidget ? '_blank' : '_self'}
      >
        {ICON_MAP[message.type]}
        <div className="flex-1">
          <div className="flex flex-row justify-between">
            <Avatar src={message.triggeredBy.avatar} className="mb-2" />
            <button
              type="button"
              className="hidden h-fit translate-x-3 -translate-y-1 rounded-full p-0.5 hover:bg-primary-600 group-hover:inline"
              onClick={(e) => {
                onClickDelete(message.id);
                e.stopPropagation();
              }}
              ref={deleteButtonRef}
              aria-label="Delete the notification message"
            >
              <IconX size={18} />
            </button>
          </div>
          <NotificationText className="flex flex-row space-x-1.5 leading-none">
            <span className="max-w-[8rem] truncate font-bold">
              {message.triggeredBy.name}
            </span>
            <span>{TITLE_MAP[message.type]}</span>
          </NotificationText>
          <NotificationText
            variant="secondary"
            as="time"
            size="sm"
            className="mt-1 block cursor-default leading-none"
            dateTime={message.createdAt}
          >
            {dayjs(message.createdAt).fromNow()}
          </NotificationText>
          {message.content && (
            <NotificationText
              size="sm"
              className="mt-2 max-w-[15rem] truncate"
              variant="secondary"
              title={message.content}
              aria-label="Comment content"
            >
              {message.content}
            </NotificationText>
          )}
        </div>
      </Link>
      {index < length - 1 && (
        <Divider className="w-full group-hover:bg-primary-400" />
      )}
    </Menu.Item>
  );
}

function NotificationText({ className, ...restProps }: TextProps): JSX.Element {
  return (
    <Text
      {...restProps}
      className={clsx('group-hover:text-primary-1100', className)}
    />
  );
}

const TITLE_MAP: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'left a comment',
  ReceivedAReply: 'replied to your comment',
  ReceivedALike: 'liked your comment',
  CommentDeleted: 'deleted your comment',
};

const ICON_SIZE = 24;
const COMMENT_ICON = (
  <span className="text-blue-900 group-hover:text-primary-900">
    <IconMessageSquare size={ICON_SIZE} className="-scale-x-1" />
  </span>
);

const ICON_MAP: Record<NotificationType_Enum, JSX.Element> = {
  ReceivedAComment: COMMENT_ICON,
  ReceivedAReply: COMMENT_ICON,
  ReceivedALike: (
    <span className="text-pink-900 group-hover:text-primary-900">
      <IconHeartFill size={ICON_SIZE} />
    </span>
  ),
  CommentDeleted: (
    <span className="text-gray-900 group-hover:text-primary-900">
      <IconXSquare size={ICON_SIZE} />
    </span>
  ),
};
