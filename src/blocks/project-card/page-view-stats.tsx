import ArrowUp from '@geist-ui/react-icons/arrowUp';
import * as React from 'react';
import tw from 'twin.macro';

import { Link } from '$/components/link';
import { Text } from '$/components/text';
import { ANALYTICS_DOMAIN } from '$/lib/constants';

import { getStats } from '../analytics/analytics-api';

export type PageViewStatsProps = {
  domain: string;
};

export function PageViewStats({ domain }: PageViewStatsProps): JSX.Element {
  const [grow, setGrow] = React.useState<number | null>(null);
  const [pageviews, setPageviews] = React.useState<number | null>(null);
  React.useEffect(() => {
    getStats(`/api/stats/${ANALYTICS_DOMAIN}/main-graph`, { domain } as any, {
      period: '7d',
      date: new Date(),
      filters: {},
    })
      .then((res: any) => {
        const pv = (res.top_stats as { change: number; name: string; value: number }[]).find(
          (s) => s.name === 'Total pageviews',
        );
        if (pv) {
          setGrow(pv.change);
          setPageviews(pv.value);
        }
      })
      .catch(() => {
        console.log('No stats data');
      });
  }, [domain]);
  return (
    <>
      {grow !== null && pageviews !== null && (
        <Link
          variant="plain"
          href={`/analytics/${domain}`}
          tabIndex={-1}
          tooltip={'PV of last 7 days, click to view analytics details'}
          aria-label={'View analytics'}
          tw="flex flex-row items-end space-x-1"
        >
          <Text size="xl" tw="leading-none" aria-label="Page views">
            {pageviews}
          </Text>
          <span
            tw="flex flex-row items-end"
            css={grow > 0 ? tw`text-green-900` : tw`text-yellow-1000`}
          >
            <ArrowUp size={14} css={[grow <= 0 && tw`transform rotate-180`]} />
            <Text size="xs" tw="leading-none" style={{ color: 'inherit' }}>
              {`${100}`}%
            </Text>
          </span>
        </Link>
      )}
    </>
  );
}
