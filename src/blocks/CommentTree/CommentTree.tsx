import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';
import { css, theme } from 'twin.macro';

import { CommentLeafType } from '$/types/widget';

import { CommentBranch } from '../CommentBranch';
import { CommentCard, CommentCardProps } from '../CommentCard';
import { RTEValue } from '../RichTextEditor/RichTextEditor';

export type CommentProps = {
  comment: CommentLeafType;
} & Pick<CommentCardProps, 'onSubmitReply' | 'onClickLikeAction'>;

/**
 * Render a comment with it's replies, like a tree.
 */
function CommentTree({ comment, onClickLikeAction, onSubmitReply }: CommentProps): JSX.Element {
  return (
    <CommentBranch hiddenBranch={comment.depth === 1}>
      <CommentCard
        commentId={comment.id}
        author={comment.user}
        content={comment.content as RTEValue}
        likes={comment.likes}
        depth={comment.depth}
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
          <AnimatePresence>
            {comment.replies?.map((reply: $TsFixMe) => (
              <m.div
                key={reply.id}
                layout
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <MemoCommentTree
                  key={reply.id}
                  comment={reply}
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

const MemoCommentTree = React.memo(CommentTree);
export { MemoCommentTree as CommentTree };
