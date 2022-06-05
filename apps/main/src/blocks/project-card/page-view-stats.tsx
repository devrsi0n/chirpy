import clsx from 'clsx';
import * as React from 'react';

import { IconArrowUp } from '$/components/icons';
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
          className="!flex flex-row items-end space-x-1"
        >
          <Text size="xl" className="!leading-none" aria-label="Page views">
            {pageviews}
          </Text>
          <span
            className={clsx(
              'flex flex-row items-end',
              grow > 0 ? `text-green-900` : `text-yellow-1000`,
            )}
          >
            <IconArrowUp size={14} className={clsx(grow <= 0 && `rotate-180`)} />
            <Text size="xs" className="!leading-none" style={{ color: 'inherit' }}>
              {`${100}`}%
            </Text>
          </span>
        </Link>
      )}
    </>
  );
}
