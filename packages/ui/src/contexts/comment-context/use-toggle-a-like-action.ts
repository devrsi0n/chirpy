import { trpcClient } from '@chirpy-dev/trpc/src/client';

import { useToast } from '../../components/toast';
import { useCurrentUser } from '../../contexts/current-user-context';
import { useSignInWindow } from '../../hooks/use-sign-in-window';
import { logger } from '../../utilities/logger';
import { RefetchComment } from './comment-context';

export type UseToggleALikeAction = ReturnType<typeof useToggleALikeAction>;

export function useToggleALikeAction(
  refetch: RefetchComment['refetchComment'],
) {
  const {
    data: { id: currentUserId },
  } = useCurrentUser();
  const { mutateAsync: insertOneLike } = trpcClient.like.create.useMutation();
  const { mutateAsync: deleteLikeByPk } = trpcClient.like.delete.useMutation();

  const { showToast } = useToast();
  const handleSignIn = useSignInWindow();
  const { mutate: mutateANotification } =
    trpcClient.notification.mutate.useMutation();
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
      await refetch();
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
      await refetch();
    } catch (error) {
      showToast({
        type: 'error',
        title: `Server didn't respond, please try again later.`,
      });
      // There is a `Unique constraint failed on the fields: (`userId`,`commentId`)` error
      // when a user click the like button again during this API processing
      // TODO: Refresh UI immediately, call APIs in the background
      logger.error('Insert a like', error);
    }
  };

  return toggleALikeAction;
}
