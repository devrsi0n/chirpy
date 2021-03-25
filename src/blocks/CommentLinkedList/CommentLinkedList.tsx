import * as React from 'react';
import tw, { css, styled, theme } from 'twin.macro';

import { CommentDetailNode } from '$/types/widget';

import { CommentBranch } from '../CommentBranch';
import { CommentCard, CommentCardProps } from '../CommentCard';

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
  const [parentComments, setParentComments] = React.useState<Comment[]>([]);
  React.useEffect(() => {
    let currComment: $TsAny = comment;
    const _parentComments = [comment];
    while (currComment.parent) {
      _parentComments.unshift(currComment.parent);
      currComment = currComment.parent;
    }
    setParentComments(_parentComments);
  }, [comment]);

  return (
    <div tw="space-y-2">
      <ul tw="space-y-8">
        {parentComments.map((_comment, index) => (
          <ParentBranch key={_comment.id}>
            <CommentCard
              disableLink={index === 0}
              commentId={_comment.id}
              content={_comment.content}
              author={_comment.user}
              likes={_comment.likes}
              createdAt={_comment.createdAt}
              onSubmitReply={onSubmitReply}
              onClickLikeAction={onClickLikeAction}
            />
          </ParentBranch>
        ))}
      </ul>
      <div tw="flex flex-col items-end">
        <ul
          css={[
            css`
              width: calc(100% - ${theme('spacing.16')});
            `,
            tw`space-y-2`,
          ]}
        >
          {comment.replies?.map((reply: $TsFixMe) => (
            <CommentBranch key={reply.id}>
              <CommentCard
                commentId={reply.id}
                content={reply.content}
                author={reply.user}
                likes={reply.likes}
                createdAt={reply.createdAt}
                onClickLikeAction={onClickLikeAction}
                onSubmitReply={onSubmitReply}
              />
            </CommentBranch>
          ))}
        </ul>
      </div>
    </div>
  );
}

const MemoCommentLinkedList = React.memo(CommentLinkedList);
export { MemoCommentLinkedList };

const branchWidth = '2.4rem';
const branchHeight = '2.0';
const ParentBranch = styled.li(() => [
  tw`space-y-8`,
  css`
    position: relative;

    &:before {
      position: absolute;
      top: -${branchHeight}rem;
      left: ${branchWidth};
      display: block;
      width: ${branchWidth};
      height: ${branchHeight}rem;
      content: '';
      border-left-width: 1px;
      ${tw`border-gray-300`}
    }

    &:first-child:before {
      display: none;
    }
  `,
]);
