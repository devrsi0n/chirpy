import * as React from 'react';
import dayjs from 'dayjs';
import { Node } from 'slate';

import { MessageIcon } from '$/components/Icons';
import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import { RichTextEditor } from '../RichTextEditor';
import { ActionButton } from '$/components/Button';

import { CommentByPage } from '$/types/widget';
import { LikeAction, LikeActionProps } from '../LikeAction/LikeAction';

import styles from './style.module.scss';
import clsx from 'clsx';

export type CommentProps = {
  comment: CommentByPage;
  currentUserId?: string;
  onSubmitReply: (reply: Node[], commentId: string) => Promise<void>;
} & Pick<LikeActionProps, 'onClickLikeAction'>;

function CommentBlock({
  comment,
  currentUserId,
  onClickLikeAction,
  onSubmitReply,
}: CommentProps): JSX.Element {
  const { id: commentId, user: author, content, createdAt, likes, replies } = comment;
  const { avatar, name } = author;

  const [showReplyEditor, setShowReplyEditor] = React.useState(false);
  const handlePressReply = React.useCallback(() => {
    setShowReplyEditor((prev) => !prev);
  }, []);
  const handleSubmitReply = async (replyContent: Node[]) => {
    await onSubmitReply(replyContent, commentId);
    setShowReplyEditor(false);
    // TODO: Notification
  };
  const handleDimissRTE = () => {
    setShowReplyEditor(false);
  };

  return (
    <div className="space-y-1">
      <section className="flex flex-row items-start px-6 py-4 space-x-3 bg-gray-100 rounded-lg shadow-sm">
        <Avatar size="lg" src={avatar ?? ''} alt={`User ${name}'s avatar`} />
        <div className="flex-1">
          <div className="flex flex-row items-baseline space-x-4 leading-none">
            <Text bold>{name}</Text>
            <Text
              as="time"
              title={createdAt}
              className="leading-none cursor-default text-text-light"
            >
              {dayjs(createdAt).fromNow()}
            </Text>
          </div>
          <div className="mt-2">
            <RichTextEditor initialValue={content} readOnly />
          </div>
          <div className="flex flex-row items-center space-x-6 transform -translate-x-2">
            <LikeAction
              likes={likes}
              commentId={commentId}
              currentUserId={currentUserId}
              onClickLikeAction={onClickLikeAction}
            />
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
      </section>
      <div className="flex flex-col items-end">
        <div className={clsx(styles.replyContainer)}>
          {replies?.map((reply) => (
            <MemoCommentBlock
              key={reply.id}
              comment={reply as CommentByPage}
              currentUserId={currentUserId}
              onClickLikeAction={onClickLikeAction}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const MemoCommentBlock = React.memo(CommentBlock);
// const MemoCommentBlock = CommentBlock;
export { MemoCommentBlock };
