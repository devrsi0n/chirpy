import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';
import * as React from 'react';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { ActionButton, ActionButtonProps } from '$/components/Button';

export type ClickLikeActionHandler = (didLike: boolean, likeId: string, commentId: string) => void;

export type Like = {
  id: string;
  userId: number;
};

export type LikeActionProps = React.PropsWithChildren<
  {
    likes: Like[];
    commentId: string;
    onClickLikeAction: ClickLikeActionHandler;
  } & Omit<ActionButtonProps, 'icon' | 'color' | 'onClick'>
>;

// TODO: Animation
export function LikeAction({
  likes = [],
  commentId,
  onClickLikeAction,
  ...restProps
}: LikeActionProps): JSX.Element {
  const { data } = useCurrentUser();
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
    onClickLikeAction(didLike, likedId, commentId);
  };

  const HeartComponent = didLike ? HeartFill : Heart;
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
