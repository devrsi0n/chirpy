import * as React from 'react';

import { CommentLeafType } from '$/types/widget';

import { CommentBranch } from '../comment-branch';
import { CommentCard } from '../comment-card';
import { RTEValue } from '../rich-text-editor';

export type CommentProps = {
  comment: CommentLeafType;
  depth: number;
};

/**
 * Render a comment with it's replies, like a tree.
 */
function CommentTree({ comment, depth }: CommentProps): JSX.Element {
  return (
    <CommentBranch
      key={comment.id}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      hiddenBranch={depth === 1}
    >
      <CommentCard
        commentId={comment.id}
        author={comment.user}
        content={comment.content as RTEValue}
        likes={comment.likes}
        depth={depth}
        createdAt={comment.createdAt}
        deletedAt={comment.deletedAt}
      />
      <div className="flex flex-col items-end">
        <ul className="w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
          {comment.replies?.map((reply: $TsFixMe) => (
            <CommentTree key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </ul>
      </div>
    </CommentBranch>
  );
}

export { CommentTree };
