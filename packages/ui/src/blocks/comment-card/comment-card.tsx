import { RTEValue } from '@chirpy-dev/types';
import { COMMENT_TREE_MAX_DEPTH, isENVDev } from '@chirpy-dev/utils';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import * as React from 'react';

import { Dialog } from '../../components';
import { Avatar } from '../../components/avatar';
import { ActionButton, Button } from '../../components/button';
import {
  IconMessageSquare,
  IconMoreVertical,
  IconTrash2,
} from '../../components/icons';
import { Menu } from '../../components/menu';
import { Text } from '../../components/text';
import { useToast } from '../../components/toast';
import { useCommentContext } from '../../contexts/comment-context';
import { useCurrentUser } from '../../contexts/current-user-context';
import { CommentLeafType } from '../../types';
import { cpDayjs } from '../../utilities/date';
import { logger } from '../../utilities/logger';
import { Like, LikeAction } from '../like-action';
import { RichTextEditor } from '../rich-text-editor';
import { DeletedComment } from './deleted-comment';
import { TimelineLinkButton } from './timeline-link-button';

export type { ClickLikeActionHandler } from '../like-action';

export type Author = CommentLeafType['user'];

export type CommentCardProps = {
  commentId: string;
  author: Author;
  content: RTEValue;
  createdAt: Date;
  deletedAt?: Date | null;
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
  const { image, name, username, email } = author;
  const [showReplyEditor, setShowReplyEditor] = React.useState(false);
  const { projectId, page, deleteAComment, createAComment } =
    useCommentContext();
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
      logger.error('Replied failed', error as Error);
    }
  };
  const handleDimissRTE = () => {
    setShowReplyEditor(false);
  };
  const timelineURL = `/widget/comment/timeline/${commentId}`;
  const [containerAnimate, setContainerAnimate] = React.useState<
    'shake' | 'stop'
  >('stop');

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
  const userHasModeratePermission =
    data?.editableProjectIds?.includes(projectId);
  const createdAtDate = cpDayjs(createdAt);
  const [showDelDialog, setShowDelDialog] = React.useState(false);
  const isPageAuthor = page.authorId === author.id;

  if (isDeleted) {
    return <DeletedComment />;
  }
  return (
    <motion.article
      animate={containerAnimate}
      variants={SHAKE_VARIANTS}
      onAnimationComplete={() => setContainerAnimate('stop')}
      className={clsx(
        `flex flex-row items-start space-x-3 rounded border border-gray-500 pb-2 pl-4 pt-4 shadow-xs`,
      )}
      id={isENVDev ? commentId : undefined}
      suppressHydrationWarning
    >
      <Avatar
        size="lg"
        src={image}
        alt={`${name}'s avatar`}
        email={email}
        name={name}
        username={username}
      />
      <div className="flex-1">
        <div className="flex flex-row items-start justify-between">
          <div className="space-y-2">
            <div className="flex flex-row items-center gap-3">
              <Text bold className="!leading-none" suppressHydrationWarning>
                {name}
              </Text>
              {isPageAuthor && (
                <p className="rounded-full border border-primary-600 px-1.5 py-1 text-xs leading-none text-primary-900">
                  Author
                </p>
              )}
            </div>
            <Text
              variant="secondary"
              as="time"
              title={createdAtDate.format('YYYY-MM-DD HH:mm:ss')}
              className="block cursor-default !leading-none"
              dateTime={createdAtDate.toISOString()}
              suppressHydrationWarning
              size="sm"
            >
              {createdAtDate.fromNow()}
            </Text>
          </div>
          <>
            {userHasModeratePermission && (
              <Menu>
                <Menu.Button className="mr-3">
                  <IconMoreVertical size={20} />
                </Menu.Button>
                <Menu.Items>
                  <Menu.Item className="space-x-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDelDialog(true);
                      }}
                      className={clsx(`flex flex-row items-center`)}
                    >
                      <IconTrash2 size={16} />
                      <span className="ml-1">Delete</span>
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </>
        </div>
        <Dialog
          show={showDelDialog}
          title="Delete comment"
          onClose={() => setShowDelDialog(false)}
          type="alert"
        >
          <Dialog.Body>
            Are you sure you want to delete this comment?
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => setShowDelDialog(false)}>Cancel</Button>
            <Button
              variant="solid"
              color="primary"
              onClick={handleClickConfirmDelete}
            >
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog>
        <div className="mb-1.5 mt-1">
          <RichTextEditor initialValue={content} readOnly />
        </div>
        <div className="flex -translate-x-2 flex-row items-center space-x-6">
          <LikeAction
            aria-label="Like"
            likes={likes}
            commentId={commentId}
            title="Like this comment"
            disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
          />
          <span onClick={handlePressReply} className="flex justify-center">
            <ActionButton
              aria-label="Reply"
              color="blue"
              disabled={
                disabledReply || !!process.env.NEXT_PUBLIC_MAINTENANCE_MODE
              }
              title={
                disabledReply
                  ? 'You have reached the maximum depth of replies'
                  : 'Reply to this comment'
              }
              icon={<IconMessageSquare size={20} className="-scale-x-1" />}
            />
          </span>
          <TimelineLinkButton
            disabled={disableTimelineButton}
            href={timelineURL}
            onClick={handleClickLinkAction}
          />
        </div>
        <AnimatePresence initial={false}>
          {showReplyEditor && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.2 }}
              className="pr-6"
            >
              <RichTextEditor
                placeholder={`What are your thoughts?`}
                onSubmit={handleSubmitReply}
                styles={{ root: `mt-2` }}
                isReply
                onClickDismiss={handleDimissRTE}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

const SHAKE_VARIANTS: Variants = {
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
