import { useRouter } from 'next/router';

import { useAnalytics } from '../../components/Provider';

export default function useAuth() {
  const router = useRouter();
  const { token: tokenParam, host: hostParam } = router.query;
  const token = typeof tokenParam === 'string' ? tokenParam : null;
  const host = typeof hostParam === 'string' ? hostParam : null;
  const { error } = useAnalytics();
  const isTokenValid = !error || ![401, 403].includes(error.status ?? 0);
  const isAuthenticated = !!token && !!host;
  return { isAuthenticated, token, host, isTokenValid };
}
