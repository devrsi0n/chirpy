import * as React from 'react';
import tw from 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { Heading } from '$/components/Heading';
import { SubmitHandler } from '$/hooks/useCreateAComment';
import { ToggleLieAction } from '$/hooks/useToggleALikeAction';
import { CommentLeafType } from '$/types/widget';
import { getCommentCount } from '$/utilities/get-comment-count';

import { CommentTree } from '../CommentTree';
import { RichTextEditor } from '../RichTextEditor';
import { UserDropDown } from '../UserDropDown';

export type CommentWidgetProps = {
  comments: CommentLeafType[];
  onSubmitReply: SubmitHandler;
  onClickLikeAction: ToggleLieAction;
};

export function CommentWidget({
  comments,
  onSubmitReply,
  onClickLikeAction,
}: CommentWidgetProps): JSX.Element {
  const { isLogin } = useCurrentUser();

  const commentCount = getCommentCount(comments);
  return (
    <>
      <div css={tw`space-y-4`}>
        <div tw="flex flex-row justify-between items-center">
          <Heading as="h3" tw="text-2xl">
            {formatTitle(commentCount)}
          </Heading>
          <UserDropDown />
        </div>
        <div css={tw`space-y-7`}>
          <div css={tw`space-y-2`}>
            <RichTextEditor
              onSubmit={onSubmitReply}
              postButtonLabel={!isLogin ? 'Sign in' : undefined}
            />
          </div>

          <ul>
            {comments?.map((comment: CommentLeafType) => (
              <CommentTree
                key={comment.id}
                comment={comment}
                onClickLikeAction={onClickLikeAction}
                onSubmitReply={onSubmitReply}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
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
