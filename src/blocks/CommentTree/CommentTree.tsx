import * as React from 'react';
import 'twin.macro';
import { css, theme } from 'twin.macro';

import { CommentLeaf } from '$/types/widget';

import { CommentCard, CommentCardProps } from '../CommentCard';

export type CommentProps = {
  comment: CommentLeaf;
} & Pick<CommentCardProps, 'onSubmitReply' | 'onClickLikeAction'>;

/**
 * Render a comment with it's replies, like a tree.
 */
function CommentTree({ comment, onClickLikeAction, onSubmitReply }: CommentProps): JSX.Element {
  return (
    <div tw="space-y-2">
      <CommentCard
        commentId={comment.id}
        author={comment.user}
        content={comment.content}
        likes={comment.likes}
        createdAt={comment.createdAt}
        onClickLikeAction={onClickLikeAction}
        onSubmitReply={onSubmitReply}
      />
      <div tw="flex flex-col items-end">
        <div
          css={css`
            width: calc(100% - ${theme('spacing.8')});
          `}
        >
          {comment.replies?.map((reply: $TsFixMe) => (
            <MemoCommentTree
              key={reply.id}
              comment={reply}
              onClickLikeAction={onClickLikeAction}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const MemoCommentTree = React.memo(CommentTree);
export { MemoCommentTree as CommentTree };
