import * as React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';
import { Node } from 'slate';

import { MessageIcon } from '$/components/Icons/Message.Icon';
import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import { RichTextEditor } from './RichTextEditor/RichTextEditor';
import { ActionButton } from '$/components/buttons/ActionButton';
import { Button } from '$/components/buttons/Button';
import { CommentInWidget } from '$/types/widget';
import { useCreateOneReplyMutation } from '$/generated/graphql';
import { useRefreshServerProps } from '$/hooks/useRefreshServerProps';

dayjs.extend(relativeTime);

export type CommentProps = {
  comment: CommentInWidget;
  userId?: string;
  onClickLike(liked: boolean, commentId: string, likedId: string): void;
};

// TODO: Handle click like inside this component.
function Comment({ comment, onClickLike }: CommentProps): JSX.Element {
  const { id, user, content, createdAt, pageId, likes, replies: _replies } = comment;
  const [replies, setReplies] = React.useState(_replies);
  const { avatar, name, id: userId } = user;
  let likedId = '';
  const liked =
    !!userId &&
    likes.some((like) => {
      if (like.userId === userId) {
        likedId = like.id;
        return true;
      }
      return false;
    });
  const handleClickLike = () => {
    onClickLike(liked, id, likedId);
  };
  const HeartComponent = liked ? HeartFill : Heart;
  const [showReplyEditor, setShowReplyEditor] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: `What are your thoughts?` }],
    },
  ]);
  const handlePressReply = React.useCallback(() => {
    setShowReplyEditor((prev) => !prev);
  }, []);

  // const refreshProps = useRefreshServerProps();
  const [createOneReply] = useCreateOneReplyMutation();
  const handleSubmitReply = React.useCallback(() => {
    if (!userId) {
      return;
    }
    createOneReply({
      variables: {
        content: replyContent,
        id,
        pageId,
        userId,
      },
    }).then(({ data }) => {
      if (data?.updateOneComment?.replies) {
        setReplies(data.updateOneComment.replies);
      }
    });
  }, [replyContent, id, pageId, userId, createOneReply]);

  return (
    <section className="flex flex-row items-start space-x-2 py-2">
      <Avatar size="md" src={avatar ?? ''} alt={`User ${name}'s avatar`} />
      <div className="bg-gray-50 flex-1 px-6 py-4 rounded-r-3xl rounded-bl-3xl space-y-2">
        <div className="flex flex-row items-center space-x-4">
          <Text>{name}</Text>
          <Text as="time" variant="xs" title={createdAt} className="text-text-light cursor-default">
            {dayjs(createdAt).fromNow()}
          </Text>
        </div>
        <div>
          <RichTextEditor value={content} readOnly />
        </div>
        <div className="flex flex-row items-center space-x-6">
          <ActionButton
            color="pink"
            activated={liked}
            icon={<HeartComponent size={20} onClick={handleClickLike} />}
          >
            {!!likes.length && <span>{likes.length}</span>}
          </ActionButton>
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
        </div>
        {showReplyEditor && (
          <div className="flex flex-col space-y-2">
            <RichTextEditor
              value={replyContent}
              placeholder={[
                {
                  type: 'paragraph',
                  children: [{ text: `What are your thoughts?` }],
                },
              ]}
              onChange={setReplyContent}
              className="bg-white"
            />
            <div className="flex flex-row justify-end">
              <Button size="md" onClick={handleSubmitReply}>
                Submit
              </Button>
            </div>
          </div>
        )}
        {replies?.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply as CommentInWidget}
            onClickLike={handleClickLike}
          />
        ))}
      </div>
    </section>
  );
}

const MemoComment = React.memo(Comment);
export { MemoComment as Comment };
