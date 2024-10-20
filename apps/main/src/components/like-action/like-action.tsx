import {
  ActionButton,
  ActionButtonProps,
  IconHeart,
  IconHeartFill,
  useToast,
} from '@chirpy-dev/ui';
import * as React from 'react';

import { useCommentContext, useCurrentUser } from '$/contexts';

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
  const { showToast } = useToast();
  const isPending = React.useRef(false);
  const handleClickLike = async () => {
    if (isPending.current) {
      return showToast({
        type: 'warning',
        title: 'Click too quick',
        description: "You're clicking too quick, please wait a moment.",
      });
    }
    isPending.current = true;
    await toggleALikeAction(didLike, likedId, commentId);
    isPending.current = false;
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
