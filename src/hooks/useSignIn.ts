import { usePopupWindow } from './usePopupWindow';

export function useSignIn(): () => void {
  const handleClickSignIn = usePopupWindow({ url: '/sign-in' });
  return handleClickSignIn;
}
