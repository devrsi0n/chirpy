import { Refetch } from '@chirpy-dev/types';
import { useSession } from 'next-auth/react';

import { getAuthHeaders } from '../utilities/gql-client';

/**
 * Bypass gql cache
 */
export function useBypassCacheRefetch(refetch: Refetch): Refetch {
  const { data } = useSession();
  return (opts) => {
    if (!data?.hasuraToken) {
      throw new Error('Refetch without a valid hasuraToken');
    }
    refetch({
      ...opts,
      fetchOptions: {
        headers: {
          ...getAuthHeaders(data?.hasuraToken),
          'x-stellate-bypass': 'true',
        },
      },
    });
  };
}
