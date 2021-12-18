import * as React from 'react';
import tw, { css, theme } from 'twin.macro';

import { CommentDetailNode } from '$/types/widget';

import { CommentBranch } from '../CommentBranch';
import { CommentCard, CommentCardProps } from '../CommentCard';
import { RTEValue } from '../RichTextEditor';

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
  const [ancestorComments, setAncestorComments] = React.useState<Comment[]>([]);
  React.useEffect(() => {
    let currComment: $TsAny = comment;
    const _parentComments = [comment];
    while (currComment.parent) {
      _parentComments.unshift(currComment.parent);
      currComment = currComment.parent;
    }
    setAncestorComments(_parentComments);
  }, [comment]);
  let depth = 0;

  return (
    <div tw="space-y-2">
      <ul tw="space-y-8">
        {ancestorComments.map((_comment) => {
          depth += 1;
          return (
            <ParentBranch key={_comment.id}>
              <CommentCard
                preventDetailsPage={_comment.id === comment.id}
                commentId={_comment.id}
                content={_comment.content as RTEValue}
                author={_comment.user}
                likes={_comment.likes}
                depth={depth}
                createdAt={_comment.createdAt}
                deletedAt={_comment.deletedAt}
                onSubmitReply={onSubmitReply}
                onClickLikeAction={onClickLikeAction}
              />
            </ParentBranch>
          );
        })}
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
          {comment.replies?.map((reply) => (
            <CommentBranch key={reply.id}>
              <CommentCard
                commentId={reply.id}
                content={reply.content}
                author={reply.user}
                likes={reply.likes}
                depth={depth + 1}
                createdAt={reply.createdAt}
                deletedAt={reply.deletedAt}
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

type ParentBranchProps = React.ComponentPropsWithoutRef<'li'>;

function ParentBranch(props: ParentBranchProps): JSX.Element {
  return (
    <li
      {...props}
      css={[
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
            ${tw`border-gray-500`}
          }

          &:first-of-type:before {
            display: none;
          }
        `,
      ]}
    />
  );
}
