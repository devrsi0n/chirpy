import { usePopupWindow } from './usePopupWindow';

export function useSignIn(): () => void {
  const handleClickSignIn = usePopupWindow({ url: '/auth/sign-in' });
  return handleClickSignIn;
}
