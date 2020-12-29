import * as React from 'react';
import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';

import { CommentByPage } from '$/types/widget';
import { ActionButton } from '$/components/buttons/ActionButton';
import { useCreateOneLikeMutation, useDeleteOneLikeMutation } from '$/generated/graphql';

export type LikeActionProps = React.PropsWithChildren<{
  likes: CommentByPage['likes'];
  commentId: string;
  currentUserId?: string;
}>;

// TODO: Animation
export function LikeAction({
  likes: _likes,
  commentId,
  currentUserId,
}: LikeActionProps): JSX.Element {
  let likedId = '';
  const [likes, setLikes] = React.useState(_likes);
  const [liked, setLiked] = React.useState(
    !!currentUserId &&
      likes.some((like) => {
        if (like.userId === currentUserId) {
          likedId = like.id;
          return true;
        }
        return false;
      }),
  );
  const [createOneLike] = useCreateOneLikeMutation();
  const [deleteOneLike] = useDeleteOneLikeMutation();
  const handleClickLike = React.useCallback(() => {
    if (!currentUserId) {
      console.error('No user id, login first');
      return;
    }
    if (liked) {
      deleteOneLike({
        variables: {
          id: likedId,
        },
      }).then(() => {
        setLiked(false);
        setLikes((prev) => prev.filter(({ id }) => id !== likedId));
      });
    } else {
      createOneLike({
        variables: {
          commentId,
          userId: currentUserId,
        },
      }).then((data) => {
        if (data.data?.createOneLike.id) {
          setLiked(true);
          setLikes((prev) => [
            ...prev,
            {
              id: data.data!.createOneLike.id,
              userId: currentUserId,
            },
          ]);
        }
      });
    }
  }, [commentId, liked, likedId, createOneLike, currentUserId, deleteOneLike]);
  React.useEffect(() => {
    if (!!_likes.length) {
      setLikes(_likes);
    }
  }, [_likes]);

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
