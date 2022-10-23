import * as React from 'react';

import { ActionButton, ActionButtonProps } from '../../components/button';
import { IconHeart, IconHeartFill } from '../../components/icons';
import { useCommentContext } from '../../contexts/comment-context';
import { useCurrentUser } from '../../contexts/current-user-context';

export type ClickLikeActionHandler = (
  didLike: boolean,
  likeId: string,
  commentId: string,
) => void;

export type Like = {
  id: string;
  userId: string;
};

export type LikeActionProps = React.PropsWithChildren<
  {
    likes: Like[];
    commentId: string;
  } & Omit<ActionButtonProps, 'icon' | 'color' | 'onClick'>
>;

// TODO: Animation
export function LikeAction({
  likes = [],
  commentId,
  ...restProps
}: LikeActionProps): JSX.Element {
  const { data } = useCurrentUser();
  const { toggleALikeAction } = useCommentContext();
  const currentUserId = data?.id;
  let likedId = '';
  const didLike =
    !!currentUserId &&
    likes.some((like) => {
      if (like.userId === currentUserId) {
        likedId = like.id;
        return true;
      }
      return false;
    });

  const handleClickLike = () => {
    toggleALikeAction(didLike, likedId, commentId);
  };

  const HeartComponent = didLike ? IconHeartFill : IconHeart;
  return (
    <ActionButton
      {...restProps}
      color="pink"
      activated={didLike}
      onClick={handleClickLike}
      icon={<HeartComponent size={20} />}
    >
      {likes.length > 0 && <span>{likes.length}</span>}
    </ActionButton>
  );
}
