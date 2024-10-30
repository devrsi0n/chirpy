import { trpc } from '@chirpy-dev/trpc/src/client';

import { useToast } from '../../components/toast';
import { useSignInWindow } from '../../hooks/use-sign-in-window';
import { logger } from '../../utilities/logger';
import { useCurrentUser } from '../current-user-context';

export type UseToggleAPinAction = ReturnType<typeof useToggleAPinAction>;

export function useToggleAPinAction() {
  const {
    data: { id: currentUserId },
  } = useCurrentUser();
  const { mutateAsync: togglePin } = trpc.comment.togglePin.useMutation();

  const { showToast } = useToast();
  const handleSignIn = useSignInWindow();
  const toggleAPinAction = async (
    commentId: string,
    pinnedAt?: Date | null,
  ) => {
    if (!currentUserId) {
      handleSignIn();
      return;
    }
    try {
      const data = await togglePin({
        id: commentId,
        pinned: !pinnedAt,
      });
      if (!data?.id) {
        showToast({
          type: 'error',
          title: `Server didn't respond, please try again later.`,
        });
        logger.error(`Can't pin a comment`);
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: `Server didn't respond, please try again later.`,
      });
      // There is a `Unique constraint failed on the fields: (`userId`,`commentId`)` error
      // when a user click the like button again during this API processing
      // TODO: Refresh UI immediately, call APIs in the background
      logger.error('Failed to pin a comment', error as Error);
    }
  };

  return toggleAPinAction;
}
