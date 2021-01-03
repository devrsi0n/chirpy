import * as React from 'react';
import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';

import { CommentByPage } from '$/types/widget';
import { ActionButton } from '$/components/Button/ActionButton';

export type HandleClickLikeAction = (isLiked: boolean, likeId: string, commentId: string) => void;

export type LikeActionProps = React.PropsWithChildren<{
  likes: CommentByPage['likes'];
  commentId: string;
  onClickLikeAction: HandleClickLikeAction;
  currentUserId?: string;
}>;

// TODO: Animation
export function LikeAction({
  likes,
  commentId,
  currentUserId,
  onClickLikeAction,
}: LikeActionProps): JSX.Element {
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

  const handleClickLike = () => {
    onClickLikeAction(liked, likedId, commentId);
  };

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
