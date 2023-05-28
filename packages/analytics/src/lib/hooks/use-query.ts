import { useState } from 'react';
import useSWR, { Key, Fetcher } from 'swr';

import { QueryError, QueryResponse } from '../types/api';

export default function useQuery<T, K extends Key>(
  key: K,
  fetcher: Fetcher<T, K>,
  config?: {
    onSuccess?: (data: T) => void;
    onError?: (error: QueryError) => void;
  },
): QueryResponse<T> {
  const [warning, setWarning] = useState<QueryError | null>(null);

  const handleError = (error: QueryError) => {
    config?.onError?.(error);
    if (error.status !== 404 && error.status !== 400) return;
    setWarning(error);
  };

  const handleSuccess = (data: T) => {
    config?.onSuccess?.(data);
    setWarning(null);
  };

  const query = useSWR(key, fetcher, {
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { data, error, isValidating } = query;

  const getStatus = () => {
    if (!data && !error) return 'loading';
    if (isValidating) return 'updating';
    if (error) return 'error';
    if (!!data) return 'success';
    return 'idle';
  };

  return { ...query, warning, status: getStatus() };
}
