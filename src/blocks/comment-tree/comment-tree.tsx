import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import { css, theme } from 'twin.macro';

import { CommentLeafType } from '$/types/widget';

import { CommentBranch } from '../comment-branch';
import { CommentCard, CommentCardProps } from '../comment-card';
import { RTEValue } from '../rich-text-editor';

export type CommentProps = {
  comment: CommentLeafType;
  depth: number;
} & Pick<CommentCardProps, 'onSubmitReply' | 'onClickLikeAction'>;

/**
 * Render a comment with it's replies, like a tree.
 */
function CommentTree({
  comment,
  depth,
  onClickLikeAction,
  onSubmitReply,
}: CommentProps): JSX.Element {
  return (
    <CommentBranch hiddenBranch={depth === 1}>
      <CommentCard
        commentId={comment.id}
        author={comment.user}
        content={comment.content as RTEValue}
        likes={comment.likes}
        depth={depth}
        createdAt={comment.createdAt}
        deletedAt={comment.deletedAt}
        onClickLikeAction={onClickLikeAction}
        onSubmitReply={onSubmitReply}
      />
      <div tw="flex flex-col items-end">
        <ul
          css={css`
            width: calc(100% - ${theme('spacing.16')});
          `}
        >
          <AnimatePresence>
            {comment.replies?.map((reply: $TsFixMe) => (
              <m.div
                key={reply.id}
                layout
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <CommentTree
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  onClickLikeAction={onClickLikeAction}
                  onSubmitReply={onSubmitReply}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </CommentBranch>
  );
}

export { CommentTree };
