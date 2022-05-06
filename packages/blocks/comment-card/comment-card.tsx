import Info from '@geist-ui/react-icons/info';
import MessageSquare from '@geist-ui/react-icons/messageSquare';
import MoreVertical from '@geist-ui/react-icons/moreVertical';
import Trash2 from '@geist-ui/react-icons/trash2';
import clsx from 'clsx';
import { m, Variants } from 'framer-motion';
import * as React from 'react';

import {
  Avatar,
  ActionButton,
  Button,
  Link,
  Menu,
  MenuItemPadding,
  Popover,
  Text,
  useToast,
} from '@chirpy/components';
import { SubmitHandler } from '@chirpy/contexts';
import { isENVDev, COMMENT_TREE_MAX_DEPTH } from '@chirpy/utilities';
import { dayjs } from '../utilities/date';

import { useCommentContext } from '@chirpy/contexts';
import { useCurrentUser } from '@chirpy/contexts';
import { Like, LikeAction, ClickLikeActionHandler } from '../like-action';
import { RichTextEditor } from '../rich-text-editor';
import { RTEValue } from '@chirpy/types';
import { PLACEHOLDER_OF_DELETED_COMMENT } from './config';

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
  deletedAt,
  onSubmitReply,
  onClickLikeAction,
}: CommentCardProps): JSX.Element {
  const { avatar, name } = author;
  const [showReplyEditor, setShowReplyEditor] = React.useState(false);
  const { projectId, deleteAComment } = useCommentContext();
  const { showToast } = useToast();
  const handleClickConfirmDelete = () => {
    deleteAComment(commentId);
  };
  const handleSubmitReply = async (replyContent: RTEValue) => {
    try {
      await onSubmitReply(replyContent, commentId);
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
  const detailsURL = `/widget/comment/details/${commentId}`;
  const [containerAnimate, setContainerAnimate] = React.useState<'shake' | 'stop'>('stop');

  const handleClickLinkAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (preventDetailsPage) {
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
        `flex flex-row items-start space-x-3 border rounded border-gray-500 shadow-sm`,
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
                  className="!leading-none cursor-default"
                  dateTime={createdAt}
                >
                  {dayjs(createdAt).fromNow()}
                </Text>
              </div>
              <>
                {userHasModeratePermission && (
                  <Menu className="-mt-2 mr-2">
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
          <div className="flex flex-row items-center space-x-6 -translate-x-2">
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
              icon={<MessageSquare size={20} className="-scale-x-1" />}
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
              className="flex justify-center"
            >
              <ActionButton
                color="green"
                icon={<Info size={20} />}
                disabled={preventDetailsPage}
                onClick={handleClickLinkAction}
              />
            </Link>
          </div>
        )}
        {showReplyEditor && (
          <div className="flex flex-col space-y-2 pr-6">
            <RichTextEditor
              placeholder={`What are your thoughts? (Markdown shortcuts supported)`}
              onSubmit={handleSubmitReply}
              styles={{ editable: `bg-white`, root: `mt-2` }}
              isReply
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