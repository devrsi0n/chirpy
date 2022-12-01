import clsx from 'clsx';
import * as React from 'react';

import { Avatar } from '../../components/avatar';
import { Divider } from '../../components/divider';
import {
  IconHeartFill,
  IconMessageSquare,
  IconX,
  IconXSquare,
} from '../../components/icons';
import { Link } from '../../components/link';
import { Menu } from '../../components/menu';
import { Text, TextProps } from '../../components/text';
import { useIsWidget } from '../../hooks/use-is-widget';
import { cpDayjs } from '../../utilities/date';
import { RouterOutputs } from '../../utilities/trpc-client';

export type INotificationItemProps = {
  index: number;
  /**
   * Message array total length
   */
  length: number;
  message: RouterOutputs['notification']['messages'][number];
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
        'group relative mt-0 flex-col items-start  rounded-none !p-0 !text-left hover:rounded',
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
        className="flex w-full flex-row items-start space-x-2 px-5 pb-2 pt-3"
        target={isWidget ? '_blank' : '_self'}
      >
        <button
          type="button"
          className="absolute top-1.5 right-1.5 inline-block h-fit rounded-full p-0.5 hover:bg-primary-600 group-hover:inline-block sm:hidden"
          onClick={(e) => {
            onClickDelete(message.id);
            e.stopPropagation();
          }}
          ref={deleteButtonRef}
          aria-label="Delete the message"
        >
          <IconX size={18} />
        </button>
        {ICON_MAP[message.type]}
        <div className="flex-1">
          <Avatar
            src={message.triggeredBy.image}
            alt={`${message.triggeredBy.name}'s avatar`}
            email={message.triggeredBy.email}
            name={message.triggeredBy.name}
            username={message.triggeredBy.username}
            className="mb-2"
          />
          <NotificationText className="flex flex-row space-x-1.5 leading-none">
            <span
              title={message.triggeredBy.name || ''}
              className="max-w-[4rem] truncate font-bold"
            >
              {message.triggeredBy.name}
            </span>
            <span className="whitespace-nowrap">{TITLE_MAP[message.type]}</span>
          </NotificationText>
          <NotificationText
            variant="secondary"
            as="time"
            size="sm"
            className="mt-1 block cursor-default leading-none"
            dateTime={message.createdAt}
          >
            {cpDayjs(message.createdAt).fromNow()}
          </NotificationText>
          {message.content && (
            <NotificationText
              size="sm"
              className="mt-2 max-w-[15rem] truncate"
              variant="secondary"
              title={message.content}
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

// TODO: Use enum after mgrating to trpc
const TITLE_MAP: Record<string, string> = {
  ReceivedAComment: 'left a comment',
  ReceivedAReply: 'replied to your comment',
  ReceivedALike: 'liked your comment',
  CommentDeleted: 'deleted your comment',
};

const ICON_SIZE = 24;
const COMMENT_ICON = (
  <span className="text-blue-900 group-hover:text-primary-900">
    <IconMessageSquare size={ICON_SIZE} className="-scale-x-0.5" />
  </span>
);

// TODO: Use enum after mgrating to trpc
const ICON_MAP: Record<string, JSX.Element> = {
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
