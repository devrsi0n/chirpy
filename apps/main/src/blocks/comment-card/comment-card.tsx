import clsx from 'clsx';
import { AnimatePresence, m, Variants } from 'framer-motion';
import * as React from 'react';

import { easeInOut } from '$/components/animation';
import { Avatar } from '$/components/avatar';
import { ActionButton, Button } from '$/components/button';
import { MessageSquare, MoreVertical, Trash2 } from '$/components/icons';
import { Menu, MenuItemPadding } from '$/components/menu';
import { Popover } from '$/components/popover';
import { Text } from '$/components/text';
import { useToast } from '$/components/toast';
import { COMMENT_TREE_MAX_DEPTH } from '$/lib/constants';
import { isENVDev } from '$/server/utilities/env';
import { dayjs } from '$/utilities/date';

import { useCommentContext } from '../../contexts/comment-context';
import { useCurrentUser } from '../../contexts/current-user-context/use-current-user';
import { Like, LikeAction } from '../like-action';
import { RichTextEditor, RTEValue } from '../rich-text-editor';
import { PLACEHOLDER_OF_DELETED_COMMENT } from './config';
import { TimelineLinkButton } from './timeline-link-button';

export type { ClickLikeActionHandler } from '../like-action';

export type Author = {
  id: string;
  name?: string | null;
  avatar?: string | null;
};

export type CommentCardProps = {
  commentId: string;
  author: Author;
  content: RTEValue;
  createdAt: string;
  deletedAt?: string | null;
  likes: Like[];
  depth: number;
  /**
   * Disable the timeline button, avoid navigate to the same page
   */
  disableTimelineButton?: boolean;
};

export function CommentCard({
  commentId,
  author,
  content,
  depth,
  createdAt,
  likes,
  disableTimelineButton,
  deletedAt,
}: CommentCardProps): JSX.Element {
  const { avatar, name } = author;
  const [showReplyEditor, setShowReplyEditor] = React.useState(false);
  const { projectId, deleteAComment, createAComment } = useCommentContext();
  const { showToast } = useToast();
  const handleClickConfirmDelete = () => {
    deleteAComment(commentId);
  };

  const handleSubmitReply = async (replyContent: RTEValue) => {
    try {
      await createAComment(replyContent, commentId);
      setShowReplyEditor(false);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Replied failed, try again later',
      });
      console.error('Replied failed', error);
    }
  };
  const handleDimissRTE = () => {
    setShowReplyEditor(false);
  };
  const timelineURL = `/widget/comment/timeline/${commentId}`;
  const [containerAnimate, setContainerAnimate] = React.useState<'shake' | 'stop'>('stop');

  const handleClickLinkAction: React.MouseEventHandler<HTMLElement> = (e) => {
    if (disableTimelineButton) {
      e.preventDefault();
      setContainerAnimate('shake');
    }
  };
  const disabledReply: boolean = depth === COMMENT_TREE_MAX_DEPTH;
  const handlePressReply = React.useCallback(() => {
    if (disabledReply) {
      setContainerAnimate('shake');
      return;
    }
    setShowReplyEditor((prev) => !prev);
  }, [disabledReply]);
  const { data } = useCurrentUser();
  const isDeleted = !!deletedAt;
  const rteContent = isDeleted ? PLACEHOLDER_OF_DELETED_COMMENT : content;
  const userHasModeratePermission = data?.editableProjectIds?.includes(projectId);

  return (
    <m.article
      animate={containerAnimate}
      variants={shakeVariants}
      onAnimationComplete={() => setContainerAnimate('stop')}
      className={clsx(
        `flex flex-row items-start space-x-3 rounded border border-gray-500 shadow-sm`,
        isDeleted ? `py-2 pl-4` : `pt-4 pb-2 pl-4`,
      )}
      id={isENVDev ? commentId : undefined}
    >
      {!isDeleted && <Avatar size="lg" src={avatar ?? ''} alt={`User ${name}'s avatar`} />}
      <div className="flex-1">
        <div className="flex flex-row items-start justify-between">
          {!isDeleted && (
            <>
              <div className="flex flex-row items-start space-x-4">
                <Text bold className="!leading-none">
                  {name}
                </Text>
                <Text
                  variant="secondary"
                  as="time"
                  title={createdAt}
                  className="cursor-default !leading-none"
                  dateTime={createdAt}
                >
                  {dayjs(createdAt).fromNow()}
                </Text>
              </div>
              <>
                {userHasModeratePermission && (
                  <Menu className="mr-3">
                    <Menu.Button>
                      <MoreVertical size={20} />
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item className="space-x-1" disableAutoDismiss>
                        <Popover
                          placement="topEnd"
                          buttonAs="button"
                          content={
                            <div className="flex flex-row items-center space-x-2">
                              <Text size="sm" className="w-max">
                                Are you sure?
                              </Text>
                              <Button size="sm" color="red" onClick={handleClickConfirmDelete}>
                                Delete
                              </Button>
                            </div>
                          }
                        >
                          <div className={clsx(`flex flex-row items-center`, MenuItemPadding)}>
                            <Trash2 size={16} />
                            <span className="ml-1">Delete</span>
                          </div>
                        </Popover>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                )}
              </>
            </>
          )}
        </div>
        <div className="mt-1 mb-1.5">
          <RichTextEditor initialValue={rteContent} readOnly />
        </div>
        {!isDeleted && (
          <div className="flex -translate-x-2 flex-row items-center space-x-6">
            <LikeAction
              aria-label="Like"
              likes={likes}
              commentId={commentId}
              title="Like this comment"
            />
            <span onClick={handlePressReply} className="flex justify-center">
              <ActionButton
                aria-label="Reply"
                color="blue"
                disabled={disabledReply}
                title={
                  disabledReply
                    ? 'You have reached the maximum depth of replies'
                    : 'Reply to this comment'
                }
                icon={<MessageSquare size={20} className="-scale-x-1" />}
              />
            </span>
            <TimelineLinkButton
              disabled={disableTimelineButton}
              href={timelineURL}
              onClick={handleClickLinkAction}
            />
          </div>
        )}
        <AnimatePresence>
          {showReplyEditor && (
            <m.div {...easeInOut} className="flex flex-col space-y-2 pr-6">
              <RichTextEditor
                placeholder={`What are your thoughts? (Markdown shortcuts supported)`}
                onSubmit={handleSubmitReply}
                styles={{ editable: `bg-white`, root: `mt-2` }}
                isReply
                onClickDismiss={handleDimissRTE}
              />
            </m.div>
          )}
        </AnimatePresence>
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
