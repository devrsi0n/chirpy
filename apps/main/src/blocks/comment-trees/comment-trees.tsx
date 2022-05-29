import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import { Heading } from '$/components/heading';
import { useCommentContext } from '$/contexts/comment-context';
import { CommentLeafType } from '$/types/widget';
import { getCommentCount } from '$/utilities/get-comment-count';

import { CommentTree } from '../comment-tree';
import { NotificationHub } from '../notification-hub';
import { RichTextEditor } from '../rich-text-editor';
import { UserMenu } from '../user-menu';

export type CommentTreesProps = {
  comments: CommentLeafType[];
  rtePlaceholder?: string;
};

export function CommentTrees({ comments, rtePlaceholder }: CommentTreesProps): JSX.Element {
  const { createAComment } = useCommentContext();
  const commentCount = getCommentCount(comments);
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Heading as="h3" className="!text-2xl">
          {formatTitle(commentCount)}
        </Heading>
        <div className="flex flex-row">
          <NotificationHub />
          <UserMenu variant="Widget" />
        </div>
      </div>
      <div className="space-y-7">
        <div className="space-y-2">
          <RichTextEditor
            placeholder={rtePlaceholder || `What are your thoughts? (Markdown shortcuts supported)`}
            onSubmit={createAComment}
          />
        </div>
        <ul className="space-y-5">
          <AnimatePresence>
            {comments?.map((comment: CommentLeafType) => (
              <CommentTree key={comment.id} depth={1} comment={comment} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function formatTitle(count: number): string {
  if (count === 0) {
    return 'Comment';
  } else if (count === 1) {
    return '1 comment';
  }
  return `${count} comments`;
}
