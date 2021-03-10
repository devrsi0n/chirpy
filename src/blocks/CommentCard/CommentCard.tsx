import * as React from 'react';
import dayjs from 'dayjs';
import Info from '@geist-ui/react-icons/info';

import { MessageIcon } from '$/components/Icons';
import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import { ActionButton } from '$/components/Button';
import RichTextEditor, { RTEValue } from '../RichTextEditor/RichTextEditor';
import { Like, LikeAction, ClickLikeActionHandler } from '../LikeAction';
import { isENVDev } from '$server/utilities/env';
import { Link } from '$/components/Link';

export type Author = {
  id: string;
  displayName: string;
  avatar?: string | null;
};

export type SubmitReplyHandler = (value: RTEValue, commentId: string) => Promise<void>;
export type { ClickLikeActionHandler };

export type CommentCardProps = {
  commentId: string;
  author: Author;
  content: RTEValue;
  createdAt: string;
  likes: Like[];
  disableLink?: boolean;

  onSubmitReply: SubmitReplyHandler;
  onClickLikeAction: ClickLikeActionHandler;
};

export function CommentCard({
  commentId,
  author,
  content,
  createdAt,
  likes,
  disableLink,
  onSubmitReply,
  onClickLikeAction,
}: CommentCardProps): JSX.Element {
  const { avatar, displayName } = author;

  const [showReplyEditor, setShowReplyEditor] = React.useState(false);
  const handlePressReply = React.useCallback(() => {
    setShowReplyEditor((prev) => !prev);
  }, []);
  const handleSubmitReply = async (replyContent: RTEValue) => {
    await onSubmitReply(replyContent, commentId);
    setShowReplyEditor(false);
    // TODO: Notification
  };
  const handleDimissRTE = () => {
    setShowReplyEditor(false);
  };
  const detailsURL = `/widget/comment/details/${commentId}`;
  return (
    <article
      className="flex flex-row items-start p-4 space-x-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
      {...(isENVDev && {
        id: commentId,
      })}
    >
      <Avatar size="lg" src={avatar ?? ''} alt={`User ${displayName}'s avatar`} />
      <div className="flex-1">
        <div className="flex flex-row items-baseline space-x-4 leading-none">
          <Text bold>{displayName}</Text>
          <Text as="time" title={createdAt} className="leading-none cursor-default text-text-light">
            {dayjs(createdAt).fromNow()}
          </Text>
        </div>
        <div className="mt-2">
          <RichTextEditor initialValue={content} readOnly />
        </div>
        <div className="flex flex-row items-center space-x-6 transform -translate-x-2">
          <LikeAction likes={likes} commentId={commentId} onClickLikeAction={onClickLikeAction} />
          <ActionButton
            color="blue"
            icon={
              <MessageIcon
                width={20}
                height={20}
                style={{
                  transform: 'scaleX(-1)',
                }}
              />
            }
            onClick={handlePressReply}
          />
          <Link href={!disableLink ? detailsURL : ''} variant="plain" title="Expand this comment">
            <ActionButton color="green" icon={<Info size={20} />} />
          </Link>
        </div>

        {showReplyEditor && (
          <div className="flex flex-col space-y-2 bg-white">
            <RichTextEditor
              initialValue={[
                {
                  type: 'paragraph',
                  children: [{ text: `What are your thoughts?` }],
                },
              ]}
              onSubmit={handleSubmitReply}
              styles={{ root: 'px-2' }}
              showDismissButton
              onClickDismiss={handleDimissRTE}
            />
          </div>
        )}
      </div>
    </article>
  );
}
