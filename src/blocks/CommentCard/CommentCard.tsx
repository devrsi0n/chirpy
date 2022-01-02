import Info from '@geist-ui/react-icons/info';
import MessageSquare from '@geist-ui/react-icons/messageSquare';
import MoreVertical from '@geist-ui/react-icons/moreVertical';
import Trash2 from '@geist-ui/react-icons/trash2';
import { m, Variants } from 'framer-motion';
import * as React from 'react';
import tw from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { ActionButton, Button } from '$/components/Button';
import { Link } from '$/components/Link';
import { Menu, MenuItemPadding } from '$/components/Menu';
import { Popover } from '$/components/Popover';
import { Text } from '$/components/Text';
import { useToast } from '$/components/Toast';
import { SubmitHandler } from '$/hooks/useCreateAComment';
import { COMMENT_TREE_MAX_DEPTH } from '$/lib/configurations';
import { isENVDev } from '$/server/utilities/env';
import { dayjs } from '$/utilities/date';

import { useCommentContext } from '../../contexts/CommentContext';
import { useCurrentUser } from '../../contexts/CurrentUserProvider/useCurrentUser';
import { Like, LikeAction, ClickLikeActionHandler } from '../LikeAction';
import { RichTextEditor, RTEValue } from '../RichTextEditor';
import { PLACEHOLDER_OF_DELETED_COMMENT } from './config';

export type { ClickLikeActionHandler } from '../LikeAction';

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
  const rteContent = deletedAt ? PLACEHOLDER_OF_DELETED_COMMENT : content;
  const userHasModeratePermission = data?.editableProjectIds?.includes(projectId);
  const isDeleted = !!deletedAt;

  return (
    <>
      <m.article
        animate={containerAnimate}
        variants={shakeVariants}
        onAnimationComplete={() => setContainerAnimate('stop')}
        css={[
          tw`flex flex-row items-start space-x-3 border rounded border-gray-500 shadow-sm`,
          isDeleted ? tw`py-2 pl-4` : tw`pt-4 pb-2 pl-4`,
        ]}
        id={isENVDev ? commentId : undefined}
      >
        {!isDeleted && <Avatar size="lg" src={avatar ?? ''} alt={`User ${name}'s avatar`} />}
        <div tw="flex-1">
          <div tw="flex flex-row items-start justify-between">
            {!isDeleted && (
              <>
                <div tw="flex flex-row items-start space-x-4">
                  <Text bold tw="leading-none">
                    {name}
                  </Text>
                  <Text
                    variant="secondary"
                    as="time"
                    title={createdAt}
                    tw="leading-none cursor-default"
                    // @ts-ignore
                    dateTime={createdAt}
                  >
                    {dayjs(createdAt).fromNow()}
                  </Text>
                </div>
                <>
                  {userHasModeratePermission && (
                    <Menu styles={{ root: tw`-mt-2 mr-2` }} content={<MoreVertical size={20} />}>
                      <Menu.Item tw="space-x-1" disableAutoDismiss>
                        <Popover
                          placement="topEnd"
                          buttonAs="button"
                          content={
                            <div tw="flex flex-row items-center space-x-2">
                              <Text size="sm" tw="w-max text-gray-100">
                                Are you sure?
                              </Text>
                              <Button
                                size="sm"
                                onClick={handleClickConfirmDelete}
                                tw="text-gray-100!"
                              >
                                Confirm
                              </Button>
                            </div>
                          }
                        >
                          <div css={[tw`flex flex-row items-center`, MenuItemPadding]}>
                            <Trash2 size={16} />
                            <span tw="ml-1">Delete</span>
                          </div>
                        </Popover>
                      </Menu.Item>
                    </Menu>
                  )}
                </>
              </>
            )}
          </div>
          <div tw="mt-1 mb-1.5">
            <RichTextEditor initialValue={rteContent} readOnly />
          </div>
          {!isDeleted && (
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
          )}
          {showReplyEditor && (
            <div tw="flex flex-col space-y-2 pr-6">
              <RichTextEditor
                placeholder={`What are your thoughts? (Basic markdown shortcuts supported)`}
                onSubmit={handleSubmitReply}
                styles={{ editable: tw`bg-white`, root: tw`mt-2` }}
                isReply
                onClickDismiss={handleDimissRTE}
              />
            </div>
          )}
        </div>
      </m.article>
    </>
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
