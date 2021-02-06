import * as React from 'react';
import clsx from 'clsx';

import { CommentByPage } from '$/types/widget';
import { CommentCard, CommentCardProps } from '../CommentCard';

import styles from './style.module.scss';

export type CommentProps = {
  comment: CommentByPage;
} & Pick<CommentCardProps, 'onSubmitReply' | 'onClickLikeAction'>;

/**
 * Render a comment with it's replies, like a tree.
 */
function CommentTree({ comment, onClickLikeAction, onSubmitReply }: CommentProps): JSX.Element {
  return (
    <div className="space-y-2">
      <CommentCard
        commentId={comment.id}
        author={comment.user}
        content={comment.content}
        likes={comment.likes}
        createdAt={comment.createdAt}
        onClickLikeAction={onClickLikeAction}
        onSubmitReply={onSubmitReply}
      />
      <div className="flex flex-col items-end">
        <div className={clsx(styles.replyContainer)}>
          {comment.replies?.map((reply) => (
            <MemoCommentTree
              key={reply.id}
              comment={reply as CommentByPage}
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
