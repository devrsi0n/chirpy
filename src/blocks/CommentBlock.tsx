import * as React from 'react';
import dayjs from 'dayjs';
import { Node } from 'slate';

import { MessageIcon } from '$/components/Icons/Message.Icon';
import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import { RichTextEditor } from './RichTextEditor';
import { ActionButton } from '$/components/buttons/ActionButton';
import { Button } from '$/components/buttons/Button';
import { CommentByPage } from '$/types/widget';
import { LikeAction, LikeActionProps } from './LikeAction';

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
  const [replyContent, setReplyContent] = React.useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: `What are your thoughts?` }],
    },
  ]);
  const handlePressReply = React.useCallback(() => {
    setShowReplyEditor((prev) => !prev);
  }, []);
  const handleSubmitReply = async () => {
    await onSubmitReply(replyContent, commentId);
    setShowReplyEditor(false);
  };

  return (
    <section className="flex flex-row items-start py-2 space-x-2">
      <Avatar size="md" src={avatar ?? ''} alt={`User ${name}'s avatar`} />
      <div className="flex-1 px-6 py-4 space-y-2 bg-gray-50 rounded-r-3xl rounded-bl-3xl">
        <div className="flex flex-row items-center space-x-4">
          <Text>{name}</Text>
          <Text as="time" variant="xs" title={createdAt} className="cursor-default text-text-light">
            {dayjs(createdAt).fromNow()}
          </Text>
        </div>
        <div>
          <RichTextEditor value={content} readOnly />
        </div>
        <div className="flex flex-row items-center space-x-6">
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
          <MemoCommentBlock
            key={reply.id}
            comment={reply as CommentByPage}
            currentUserId={currentUserId}
            onClickLikeAction={onClickLikeAction}
            onSubmitReply={onSubmitReply}
          />
        ))}
      </div>
    </section>
  );
}

const MemoCommentBlock = React.memo(CommentBlock);
// const MemoCommentBlock = CommentBlock;
export { MemoCommentBlock };
