import { trpc } from '@chirpy-dev/trpc/src/client';

import { useToast } from '../../components/toast';
import { useCurrentUser } from '../../contexts/current-user-context';
import { useSignInWindow } from '../../hooks/use-sign-in-window';
import { logger } from '../../utilities/logger';

export type UseToggleALikeAction = ReturnType<typeof useToggleALikeAction>;

export function useToggleALikeAction() {
  const {
    data: { id: currentUserId },
  } = useCurrentUser();
  const { mutateAsync: insertOneLike } = trpc.like.create.useMutation();
  const { mutateAsync: deleteLikeByPk } = trpc.like.delete.useMutation();

  const { showToast } = useToast();
  const handleSignIn = useSignInWindow();
  const { mutate: mutateANotification } =
    trpc.notification.mutate.useMutation();
  const toggleALikeAction = async (
    isLiked: boolean,
    likeId: string,
    commentId: string,
  ) => {
    if (!currentUserId) {
      handleSignIn();
      return;
    }
    if (isLiked) {
      const data = await deleteLikeByPk(likeId);
      if (!data?.count) {
        return logger.error(`Can't delete the like, id ${likeId}`);
      }
      mutateANotification({
        op: 'DELETE',
        like: {
          id: likeId,
          commentId: commentId,
        },
      });
      return;
    }
    try {
      const data = await insertOneLike({
        commentId,
      });
      if (!data?.id) {
        showToast({
          type: 'error',
          title: `Server didn't respond, please try again later.`,
        });
        logger.error(`Can't create a like action`);
      }
      mutateANotification({
        op: 'INSERT',
        like: {
          id: data.id,
          commentId: commentId,
        },
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: `Server didn't respond, please try again later.`,
      });
      // There is a `Unique constraint failed on the fields: (`userId`,`commentId`)` error
      // when a user click the like button again during this API processing
      // TODO: Refresh UI immediately, call APIs in the background
      logger.error('Failed to insert a like', error as Error);
    }
  };

  return toggleALikeAction;
}
