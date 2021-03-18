import * as React from 'react';

import { CommentDetailNode } from '$/types/widget';
import { CommentCard, CommentCardProps } from '../CommentCard';
import 'twin.macro';

import { css, theme } from 'twin.macro';

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
  let currComment: $TsAny = comment;
  while (currComment.parent) {
    parentComments.unshift(currComment.parent);
    currComment = currComment.parent;
  }

  return (
    <div tw="space-y-2">
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
      <div tw="flex flex-col items-end">
        <div
          css={css`
            width: calc(100% - ${theme('spacing.8')});
          `}
        >
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
