import { CommentLeafType } from '@chirpy-dev/types';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import { IconArrowUp, IconButton, Text } from '../../components';
import { Heading } from '../../components/heading';
import { useCommentContext } from '../../contexts/comment-context';
import { getCommentCount } from '../../utilities/get-comment-count';
import { CommentTree } from '../comment-tree';
import { NotificationHub } from '../notification-hub';
import { RichTextEditor } from '../rich-text-editor';
import { UserMenu } from '../user-menu';
import { useCommentOrderBy } from './use-comment-order-by';

export type CommentTreesProps = {
  comments: CommentLeafType[];
  rtePlaceholder?: string;
};

export function CommentTrees({
  comments,
  rtePlaceholder,
}: CommentTreesProps): JSX.Element {
  const { createAComment } = useCommentContext();
  const commentCount = getCommentCount(comments);
  const [orderBy, setOrderBy] = useCommentOrderBy();
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
            placeholder={
              rtePlaceholder ||
              `What are your thoughts? (Markdown shortcuts supported)`
            }
            onSubmit={createAComment}
          />
        </div>
        <div className="flex flex-row items-center justify-end space-x-1">
          <Text variant="secondary" size="sm">
            Order by
          </Text>
          <IconButton
            onClick={() =>
              setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))
            }
          >
            <IconArrowUp
              className={clsx('transition', orderBy === 'asc' && 'rotate-180')}
            />
          </IconButton>
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
