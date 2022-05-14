import { useRouter } from 'next/router';

export function useIsWidget(): boolean {
  const router = useRouter();
  return router.pathname.startsWith('/widget');
}
