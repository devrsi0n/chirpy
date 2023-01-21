import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import { BaseButton, ClientOnly, IconArrowUp } from '../../components';
import { Heading } from '../../components/heading';
import { useCommentContext } from '../../contexts/comment-context';
import { getCommentCount } from '../../utilities/get-comment-count';
import { RouterOutputs } from '../../utilities/trpc-client';
import { CommentTree } from '../comment-tree';
import { NotificationHub } from '../notification-hub';
import { RichTextEditor } from '../rich-text-editor';
import { WidgetUserMenu } from '../user-menu';
import { OrderBy, useCommentOrderBy } from './use-comment-order-by';

export type CommentForestProps = {
  comments: RouterOutputs['comment']['forest'];
  rtePlaceholder?: string;
};

export function CommentForest({
  comments,
  rtePlaceholder,
}: CommentForestProps): JSX.Element {
  const { createAComment } = useCommentContext();
  const commentCount = getCommentCount(comments);
  const [orderBy, setOrderBy] = useCommentOrderBy();
  const orderedComments = sortComments(comments, orderBy);
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Heading as="h3" className="!text-display-xs">
          {formatTitle(commentCount)}
        </Heading>
        <div className="flex flex-row">
          <NotificationHub />
          <WidgetUserMenu />
        </div>
      </div>

      <div className="space-y-7">
        <div className="space-y-2">
          <RichTextEditor
            placeholder={
              rtePlaceholder || `What are your thoughts? (Markdown supported)`
            }
            onSubmit={createAComment}
          />
        </div>
        <div className="flex flex-row items-center justify-end space-x-1">
          {orderedComments.length > 1 && (
            <div className="shadow-inner rounded-lg border border-gray-700 bg-gray-500 ring-1 ring-gray-0">
              <BaseButton
                aria-label="Reorder comments"
                className="m-1 rounded border border-gray-700 bg-gray-0 p-0.5 text-gray-1200 shadow hover:bg-gray-200"
                onClick={() =>
                  setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
              >
                <ClientOnly>
                  <IconArrowUp
                    className={clsx(
                      'transition',
                      orderBy === 'asc' && 'rotate-180',
                    )}
                  />
                </ClientOnly>
              </BaseButton>
            </div>
          )}
        </div>
        <ul className="space-y-5">
          <AnimatePresence>
            {orderedComments?.map(
              (comment: RouterOutputs['comment']['forest'][number]) => (
                <CommentTree key={comment.id} depth={1} comment={comment} />
              ),
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function sortComments(
  comments: RouterOutputs['comment']['forest'],
  orderBy?: OrderBy,
): RouterOutputs['comment']['forest'] {
  if (!orderBy) {
    return comments;
  }
  const orderedComments = [...comments].sort((a, b) =>
    orderBy === 'asc'
      ? dateToNumber(a.createdAt) - dateToNumber(b.createdAt)
      : dateToNumber(b.createdAt) - dateToNumber(a.createdAt),
  );
  for (const comment of orderedComments) {
    if (comment.replies?.length > 1) {
      // @ts-ignore
      comment.replies = sortComments(comment.replies, orderBy);
    }
  }
  return orderedComments;
}

function formatTitle(count: number): string {
  if (count === 0) {
    return 'Comment';
  } else if (count === 1) {
    return '1 comment';
  }
  return `${count} comments`;
}

function dateToNumber(date: Date): number {
  return date.getTime();
}
