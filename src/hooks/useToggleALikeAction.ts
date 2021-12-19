import { useToast } from '$/components/Toast';
import { useDeleteLikeByPkMutation, useInsertOneLikeMutation } from '$/graphql/generated/like';

import { useCurrentUser } from '../contexts/CurrentUserProvider/useCurrentUser';

export type ToggleLieAction = (
  isLiked: boolean,
  likeId: string,
  commentId: string,
) => Promise<void>;

export function useToggleALikeAction(): ToggleLieAction {
  const {
    data: { id: currentUserId },
  } = useCurrentUser();
  const [insertOneLike] = useInsertOneLikeMutation();
  const [deleteLikeByPk] = useDeleteLikeByPkMutation();

  const { showToast } = useToast();

  const handleClickLikeAction = async (isLiked: boolean, likeId: string, commentId: string) => {
    if (!currentUserId) {
      // throw new Error('Login first');
    }
    if (isLiked) {
      const { data } = await deleteLikeByPk({
        variables: {
          id: likeId,
        },
      });
      if (!data?.deleteLikeByPk?.id) {
        console.error(`Can't delete the like, id ${likeId}`);
      }
    } else {
      try {
        const { data } = await insertOneLike({
          variables: {
            commentId,
          },
        });
        if (!data?.insertOneLike?.id) {
          showToast({
            type: 'error',
            title: `Sever didn't respond, please try again later.`,
          });
          console.error(`Can't create a like action`);
        }
      } catch (error) {
        showToast({
          type: 'error',
          title: `Sever didn't respond, please try again later.`,
        });
        // There is a `Unique constraint failed on the fields: (`userId`,`commentId`)` error
        // when a user click the like button again during this API processing
        // TODO: Refresh UI immediately, call APIs in the background
        console.error(error);
      }
    }
  };

  return handleClickLikeAction;
}
