import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { getTinybirdDomain, isSSRMode } from '@chirpy-dev/utils';
import * as React from 'react';

import { Link } from '../../components/link';
import { Text } from '../../components/text';

export type PageViewStatsProps = {
  domain: string;
};

export function PageViewStats({ domain }: PageViewStatsProps): JSX.Element {
  const { data } = trpcClient.analytics.kpiTotal.useQuery({
    domain: getTinybirdDomain(domain),
  });
  const pageviews = data?.pageviews;
  return (
    <>
      {typeof pageviews === 'number' && (
        <Link
          variant="plain"
          href={`/analytics/${domain}`}
          tabIndex={-1}
          tooltip={'PV of last 7 days, click to view analytics details'}
          aria-label={'View analytics'}
          className="!flex flex-row items-end space-x-1"
        >
          <Text size="xl" className="!leading-none" aria-label="Page views">
            {new Intl.NumberFormat(isSSRMode ? 'en-US' : navigator.language, {
              notation: 'compact',
            }).format(pageviews)}
          </Text>
        </Link>
      )}
    </>
  );
}
