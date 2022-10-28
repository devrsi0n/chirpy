import clsx from 'clsx';
import * as React from 'react';

import { CommentTimelineNode, RTEValue } from '@chirpy-dev/types';

import { CommentBranch } from '../comment-branch';
import { CommentCard } from '../comment-card';
import styles from './comment-linked-list.module.scss';

export type Comment = NonNullable<CommentTimelineNode>;

export type CommentTimelineProps = {
  comment: Comment;
};

/**
 * Render a comment with it's ancestor and descendant, like a comment timeline.
 */
export function CommentTimeline({
  comment,
}: CommentTimelineProps): JSX.Element {
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
    <div className="space-y-2">
      <ul className="space-y-8">
        {ancestorComments.map((_comment) => {
          depth += 1;
          return (
            <ParentBranch key={_comment.id}>
              <CommentCard
                disableTimelineButton={_comment.id === comment.id}
                commentId={_comment.id}
                content={_comment.content as RTEValue}
                author={_comment.user}
                likes={_comment.likes}
                depth={depth}
                createdAt={_comment.createdAt}
                deletedAt={_comment.deletedAt}
              />
            </ParentBranch>
          );
        })}
      </ul>
      <div className="flex flex-col items-end">
        <ul className={clsx(styles.commentList, `space-y-2`)}>
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
              />
            </CommentBranch>
          ))}
        </ul>
      </div>
    </div>
  );
}

const MemoCommentLinkedList = React.memo(CommentTimeline);
export { MemoCommentLinkedList };

type ParentBranchProps = React.ComponentPropsWithoutRef<'li'>;

function ParentBranch({
  className,
  ...liProps
}: ParentBranchProps): JSX.Element {
  return (
    <li {...liProps} className={clsx(`space-y-8`, styles.branch, className)} />
  );
}
