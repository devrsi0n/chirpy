import Info from '@geist-ui/react-icons/info';
import MessageSquare from '@geist-ui/react-icons/messageSquare';
import { m, Variants } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { ActionButton } from '$/components/Button';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { useToast } from '$/components/Toast';
import { SubmitHandler } from '$/hooks/useCreateAComment';
import { COMMENT_TREE_MAX_DEPTH } from '$/lib/configurations';
import { isENVDev } from '$/server/utilities/env';
import { dayjs } from '$/utilities/date';

import { Like, LikeAction, ClickLikeActionHandler } from '../LikeAction';
import { RichTextEditor, RTEValue } from '../RichTextEditor';

export type Author = {
  id: number;
  name?: string | null;
  avatar?: string | null;
};

export type { ClickLikeActionHandler };

export type CommentCardProps = {
  commentId: string;
  author: Author;
  content: RTEValue;
  createdAt: string;
  likes: Like[];
  depth: number;
  preventDetailsPage?: boolean;
  onSubmitReply: SubmitHandler;
  onClickLikeAction: ClickLikeActionHandler;
};

export function CommentCard({
  commentId,
  author,
  content,
  depth,
  createdAt,
  likes,
  preventDetailsPage,
  onSubmitReply,
  onClickLikeAction,
}: CommentCardProps): JSX.Element {
  const { avatar, name } = author;

  const [showReplyEditor, setShowReplyEditor] = React.useState(false);

  const { showToast } = useToast();
  const disabledReply: boolean = depth === COMMENT_TREE_MAX_DEPTH;

  const handleSubmitReply = async (replyContent: RTEValue) => {
    await onSubmitReply(replyContent, commentId, depth);
    setShowReplyEditor(false);
    showToast({
      type: 'success',
      title: 'Repied successfully!',
    });
  };
  const handleDimissRTE = () => {
    setShowReplyEditor(false);
  };
  const detailsURL = `/widget/comment/details/${commentId}`;
  const [containerAnimate, setContainerAnimate] = React.useState<'shake' | 'stop'>('stop');

  const handleClickLinkAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (preventDetailsPage) {
      e.preventDefault();
      setContainerAnimate('shake');
    }
  };

  const handlePressReply = React.useCallback(() => {
    if (disabledReply) {
      setContainerAnimate('shake');
      return;
    }
    setShowReplyEditor((prev) => !prev);
  }, [disabledReply]);

  return (
    <m.article
      animate={containerAnimate}
      variants={shakeVariants}
      onAnimationComplete={() => setContainerAnimate('stop')}
      tw="flex flex-row items-start p-4 space-x-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
      id={isENVDev ? commentId : undefined}
    >
      <Avatar size="lg" src={avatar ?? ''} alt={`User ${name}'s avatar`} />
      <div tw="flex-1">
        <div tw="flex flex-row items-baseline space-x-4 leading-none">
          <Text bold>{name}</Text>
          <Text
            as="time"
            title={createdAt}
            tw="leading-none cursor-default text-gray-400"
            // @ts-ignore
            dateTime={createdAt}
          >
            {dayjs(createdAt).fromNow()}
          </Text>
        </div>
        <div tw="mt-2">
          <RichTextEditor initialValue={content} readOnly />
        </div>
        <div tw="flex flex-row items-center space-x-6 transform -translate-x-2">
          <LikeAction
            aria-label="Like"
            likes={likes}
            commentId={commentId}
            onClickLikeAction={onClickLikeAction}
          />
          <ActionButton
            aria-label="Reply"
            color="blue"
            disabled={disabledReply}
            icon={<MessageSquare size={20} tw="transform -scale-x-1" />}
            onClick={handlePressReply}
          />
          <Link
            href={!preventDetailsPage ? detailsURL : ''}
            variant="plain"
            title={
              !preventDetailsPage
                ? 'The details of this comment'
                : `This is already the current comment's detail page`
            }
          >
            <ActionButton
              color="green"
              icon={<Info size={20} />}
              disabled={preventDetailsPage}
              onClick={handleClickLinkAction}
            />
          </Link>
        </div>

        {showReplyEditor && (
          <div tw="flex flex-col space-y-2 bg-white">
            <RichTextEditor
              initialValue={[
                {
                  type: 'paragraph',
                  children: [{ text: `What are your thoughts?` }],
                },
              ]}
              onSubmit={handleSubmitReply}
              styles={{ root: tw`px-2` }}
              showDismissButton
              onClickDismiss={handleDimissRTE}
            />
          </div>
        )}
      </div>
    </m.article>
  );
}

const shakeVariants: Variants = {
  shake: {
    translateX: [-20, 20, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.35,
    },
  },
  stop: {
    translateX: 0,
  },
};
