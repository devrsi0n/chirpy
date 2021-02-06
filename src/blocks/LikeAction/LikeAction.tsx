import * as React from 'react';
import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';

import { ActionButton } from '$/components/Button';
import { useCurrentUser } from '$/hooks/useCurrentUser';

export type ClickLikeActionHandler = (isLiked: boolean, likeId: string, commentId: string) => void;

export type Like = {
  id: string;
  user: {
    id: string;
  };
};

export type LikeActionProps = React.PropsWithChildren<{
  likes: Like[];
  commentId: string;
  onClickLikeAction: ClickLikeActionHandler;
}>;

// TODO: Animation
export function LikeAction({
  likes = [],
  commentId,
  onClickLikeAction,
}: LikeActionProps): JSX.Element {
  const { data } = useCurrentUser();
  const currentUserId = data?.currentUser?.id;
  let likedId = '';
  const liked =
    !!currentUserId &&
    likes.some((like) => {
      if (like.user.id === currentUserId) {
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
