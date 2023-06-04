import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { SWRConfig } from 'swr';

import { QueryError } from '../lib/types/api';

type IAnalyticsContext = {
  error: QueryError | null;
  setError: (error: QueryError | null) => void;
  domain: string;
};

const AnalyticsContext = createContext<IAnalyticsContext>(
  {} as IAnalyticsContext,
);

export default function AnalyticsProvider({
  children,
  domain,
}: {
  domain: string;
  children: ReactNode;
}) {
  const [error, setError] = useState<QueryError | null>(null);
  const value = useMemo(() => ({ error, setError, domain }), [error, domain]);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshInterval: 120_000,
        dedupingInterval: 0,
        revalidateOnMount: true,
        onError: (error) => {
          if (error.status === 401 || error.status === 403) {
            setError(error);
          }
        },
      }}
    >
      <AnalyticsContext.Provider value={value}>
        {children}
      </AnalyticsContext.Provider>
    </SWRConfig>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context)
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  return context;
}
