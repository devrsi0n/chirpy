import * as React from 'react';

import { CommentDetailNode } from '$/types/widget';
import { CommentCard, CommentCardProps } from '../CommentCard';
import clsx from 'clsx';

import styles from './style.module.scss';

export type Comment = NonNullable<CommentDetailNode>;

export type CommentLinkedListProps = {
  comment: Comment;
} & Pick<CommentCardProps, 'onSubmitReply' | 'onClickLikeAction'>;

/**
 * Render a comment with it's ancestor and descendant, like a linked list.
 */
export function CommentLinkedList({
  comment,
  onSubmitReply,
  onClickLikeAction,
}: CommentLinkedListProps): JSX.Element {
  const parentComments = [comment];
  let currComment: $TsFixMe = comment;
  while (currComment.parent) {
    parentComments.unshift(currComment.parent);
    currComment = currComment.parent;
  }

  return (
    <div className="space-y-2">
      {parentComments.map((_comment, index) => (
        <CommentCard
          key={_comment.id}
          disableLink={index === 0}
          commentId={_comment.id}
          content={_comment.content}
          author={_comment.user}
          likes={_comment.likes}
          createdAt={_comment.createdAt}
          onSubmitReply={onSubmitReply}
          onClickLikeAction={onClickLikeAction}
        />
      ))}
      <div className="flex flex-col items-end">
        <div className={clsx(styles.replyContainer)}>
          {comment.replies?.map((reply: $TsFixMe) => (
            <MemoCommentLinkedList
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

const MemoCommentLinkedList = React.memo(CommentLinkedList);
export { MemoCommentLinkedList };
