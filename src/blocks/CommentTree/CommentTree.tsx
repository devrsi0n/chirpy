import * as React from 'react';
import 'twin.macro';
import { css, theme } from 'twin.macro';

import { CommentLeafType } from '$/types/widget';

import { CommentBranch } from '../CommentBranch';
import { CommentCard, CommentCardProps } from '../CommentCard';

export type CommentProps = {
  comment: CommentLeafType;
  isRoot?: boolean;
} & Pick<CommentCardProps, 'onSubmitReply' | 'onClickLikeAction'>;

/**
 * Render a comment with it's replies, like a tree.
 */
function CommentTree({
  comment,
  onClickLikeAction,
  onSubmitReply,
  isRoot = true,
}: CommentProps): JSX.Element {
  return (
    <CommentBranch hiddenBranch={isRoot}>
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
        <ul
          css={css`
            width: calc(100% - ${theme('spacing.16')});
          `}
        >
          {comment.replies?.map((reply: $TsFixMe) => (
            <MemoCommentTree
              key={reply.id}
              comment={reply}
              onClickLikeAction={onClickLikeAction}
              onSubmitReply={onSubmitReply}
              isRoot={false}
            />
          ))}
        </ul>
      </div>
    </CommentBranch>
  );
}

const MemoCommentTree = React.memo(CommentTree);
export { MemoCommentTree as CommentTree };
