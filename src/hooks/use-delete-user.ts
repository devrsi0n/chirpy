import { useToast } from '$/components/toast';
import { useDeleteUserMutation } from '$/graphql/generated/user';

import { useCurrentUser } from '../contexts/current-user-context/use-current-user';
import { useSignInWindow } from './use-sign-in-window';

export type deleteAction = (userId: string) => Promise<void>;

export function useDeleteUser(): deleteAction {
  const {
    data: { id: currentUserId },
  } = useCurrentUser();
  const [{}, deleteUser] = useDeleteUserMutation();

  const { showToast } = useToast();
  const handleSignIn = useSignInWindow();

  const handleClickDeleteUser = async (userId: string) => {
    if (!currentUserId) {
      handleSignIn();
      return;
    }

    try {
      const { data } = await deleteUser({
        id: userId,
      });
      if (!data?.deleteUserByPk?.id) {
        showToast({
          type: 'error',
          title: `Server didn't respond, please try again later.`,
        });
        console.error(`Delete user failed`);
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: `Server didn't respond, please try again later.`,
      });
      console.error(error);
    }
  };

  return handleClickDeleteUser;
}
