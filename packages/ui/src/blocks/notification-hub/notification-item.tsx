import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import clsx from 'clsx';
import * as React from 'react';

import { BaseButton, Avatar } from '../../components';
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

export type INotificationItemProps = {
  message: RouterOutputs['notification']['messages'][number];
  onClickCapture: (messageId: string) => void;
  onClickDelete: (messageId: string) => void;
};

export function NotificationItem({

  message,

  onClickCapture,
  onClickDelete,
}: INotificationItemProps): JSX.Element {
  const deleteButtonRef = React.useRef<HTMLButtonElement>(null);
  const isWidget = useIsWidget();
  return (
    <Menu.Item
      as="div"
      key={message.id}
      className={clsx(
        'group relative mt-0 flex-col items-start rounded-none !p-0 !text-start hover:rounded',
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
      <BaseButton
        type="button"
        className="!absolute right-1.5 top-1.5 inline-block h-fit w-fit rounded-full p-0.5 group-hover:inline-block hover:bg-primary-600 sm:hidden"
        onClick={(e) => {
          onClickDelete(message.id);
          e.stopPropagation();
        }}
        ref={deleteButtonRef}
        aria-label="Delete the message"
        disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
      >
        <IconX size={18} />
      </BaseButton>
      <Link
        href={message.url}
        variant="plain"
        className="flex w-full flex-row items-start gap-2 px-5 pb-2 pt-3"
        target={isWidget ? '_blank' : '_self'}
      >
        <Avatar
          src={message.triggeredBy.image}
          alt={`${message.triggeredBy.name}'s avatar`}
          email={message.triggeredBy.email}
          name={message.triggeredBy.name}
          username={message.triggeredBy.username}
          className="mb-2"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              title={message.triggeredBy.name || ''}
              className="max-w-[4rem] truncate"
            >
              {message.triggeredBy.name}
            </span>
            <time dateTime={message.createdAt.toString()} className="text-xs">
              {cpDayjs(message.createdAt).fromNow()}
            </time>
          </div>
          <NotificationText
            size="sm"
            className="max-w-[15rem] truncate"
            variant="secondary"
            title={message.content || TITLE_MAP[message.type]}
          >
            {message.content ? `"${message.content}"` : TITLE_MAP[message.type]}
          </NotificationText>
        </div>
      </Link>
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

// TODO: Use enum after migrating to trpc
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

// TODO: Use enum after migrating to trpc
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
