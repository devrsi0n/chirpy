import { useToast } from '@chirpy/components';
import {
  useDeleteLikeByPkMutation,
  useInsertOneLikeMutation,
} from '@chirpy/client-graphql/generated/like';

import { useCurrentUser } from '../current-user-context';
import { useSignInWindow } from '@chirpy/hooks';

export type ToggleLieAction = (
  isLiked: boolean,
  likeId: string,
  commentId: string,
) => Promise<void>;

// TODO: pass it in comment context
export function useToggleALikeAction(): ToggleLieAction {
  const {
    data: { id: currentUserId },
  } = useCurrentUser();
  const [{}, insertOneLike] = useInsertOneLikeMutation();
  const [{}, deleteLikeByPk] = useDeleteLikeByPkMutation();

  const { showToast } = useToast();
  const handleSignIn = useSignInWindow();

  const handleClickLikeAction = async (isLiked: boolean, likeId: string, commentId: string) => {
    if (!currentUserId) {
      handleSignIn();
      return;
    }
    if (isLiked) {
      const { data } = await deleteLikeByPk({
        id: likeId,
      });
      if (!data?.deleteLikeByPk?.id) {
        console.error(`Can't delete the like, id ${likeId}`);
      }
    } else {
      try {
        const { data } = await insertOneLike({
          commentId,
        });
        if (!data?.insertOneLike?.id) {
          showToast({
            type: 'error',
            title: `Server didn't respond, please try again later.`,
          });
          console.error(`Can't create a like action`);
        }
      } catch (error) {
        showToast({
          type: 'error',
          title: `Server didn't respond, please try again later.`,
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