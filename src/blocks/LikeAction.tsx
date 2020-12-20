import * as React from 'react';
import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';

import { CommentInWidget } from '$/types/widget';
import { ActionButton } from '$/components/buttons/ActionButton';
import { useCreateOneLikeMutation, useDeleteOneLikeMutation } from '$/generated/graphql';
import { useRefreshServerProps } from '$/hooks/useRefreshServerProps';

export type LikeActionProps = React.PropsWithChildren<{
  likes: CommentInWidget['likes'];
  commentId: string;
  currentUserId?: string;
}>;

// TODO: Animation
export function LikeAction({ likes, commentId, currentUserId }: LikeActionProps): JSX.Element {
  let likedId = '';
  const liked =
    !!currentUserId &&
    likes.some((like) => {
      if (like.userId === currentUserId) {
        likedId = like.id;
        return true;
      }
      return false;
    });
  const refreshProps = useRefreshServerProps();
  const [createOneLike] = useCreateOneLikeMutation();
  const [deleteOneLike] = useDeleteOneLikeMutation();
  const handleClickLike = React.useCallback(() => {
    if (!currentUserId) {
      console.error('No user id, login first');
      return;
    }
    let promise: Promise<$TsAny>;
    if (liked) {
      promise = deleteOneLike({
        variables: {
          id: likedId,
        },
      });
    } else {
      promise = createOneLike({
        variables: {
          commentId,
          userId: currentUserId,
        },
      });
    }
    promise.then(() => {
      refreshProps();
    });
  }, [commentId, liked, likedId, createOneLike, currentUserId, deleteOneLike, refreshProps]);

  const HeartComponent = liked ? HeartFill : Heart;
  return (
    <ActionButton
      color="pink"
      activated={liked}
      icon={<HeartComponent size={20} onClick={handleClickLike} />}
    >
      {!!likes.length && <span>{likes.length}</span>}
    </ActionButton>
  );
}
