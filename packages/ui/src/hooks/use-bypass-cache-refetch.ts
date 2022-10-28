import { useSession } from 'next-auth/react';

import { getAuthHeaders } from '../utilities/gql-client';
import { Refetch } from '@chirpy-dev/types';

/**
 * Bypass gql cache
 */
export function useBypassCacheRefetch(refetch?: Refetch): Refetch {
  const { data } = useSession();
  return (opts) => {
    if (!refetch) {
      throw new Error('Refetch with empty func');
    }
    refetch({
      ...opts,
      fetchOptions: {
        headers: {
          ...getAuthHeaders(data?.hasuraToken || ''),
          'x-stellate-bypass': 'true',
        },
      },
    });
  };
}
