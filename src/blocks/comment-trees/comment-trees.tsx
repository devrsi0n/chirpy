import * as React from 'react';
import tw from 'twin.macro';

import { Heading } from '$/components/heading';
import { SubmitHandler } from '$/hooks/use-create-a-comment';
import { ToggleLieAction } from '$/hooks/use-toggle-a-like-action';
import { CommentLeafType } from '$/types/widget';
import { getCommentCount } from '$/utilities/get-comment-count';

import { CommentTree } from '../comment-tree';
import { RichTextEditor } from '../rich-text-editor';
import { UserMenu } from '../user-menu';

export type CommentTreesProps = {
  comments: CommentLeafType[];
  onSubmitReply: SubmitHandler;
  onClickLikeAction: ToggleLieAction;
  rtePlaceholder?: string;
};

export function CommentTrees({
  comments,
  onSubmitReply,
  onClickLikeAction,
  rtePlaceholder,
}: CommentTreesProps): JSX.Element {
  const commentCount = getCommentCount(comments);
  return (
    <div css={tw`space-y-4`}>
      <div tw="flex flex-row justify-between items-center">
        <Heading as="h3" tw="text-2xl">
          {formatTitle(commentCount)}
        </Heading>
        <UserMenu variant="Widget" />
      </div>
      <div css={tw`space-y-7`}>
        <div css={tw`space-y-2`}>
          <RichTextEditor
            placeholder={
              rtePlaceholder || `What are your thoughts? (Basic markdown shortcuts supported)`
            }
            onSubmit={onSubmitReply}
          />
        </div>
        <ul>
          {comments?.map((comment: CommentLeafType) => (
            <CommentTree
              key={comment.id}
              depth={1}
              comment={comment}
              onClickLikeAction={onClickLikeAction}
              onSubmitReply={onSubmitReply}
            />
          ))}
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
