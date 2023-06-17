import { QueryError } from '@chirpy-dev/utils';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

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
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context)
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  return context;
}
