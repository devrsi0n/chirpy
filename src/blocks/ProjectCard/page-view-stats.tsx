import ArrowUp from '@geist-ui/react-icons/arrowUp';
import * as React from 'react';
import tw from 'twin.macro';

import { Link } from '$/components/Link';
import { Text } from '$/components/Text';

import { getStats } from '../Analytics/analytics-api';

export type PageViewStatsProps = {
  domain: string;
};

export function PageViewStats({ domain }: PageViewStatsProps): JSX.Element {
  const [grow, setGrow] = React.useState<number | null>(null);
  const [pageviews, setPageviews] = React.useState<number | null>(null);
  React.useEffect(() => {
    getStats(`/api/stats/${encodeURIComponent(domain)}/main-graph`, { domain } as any, {
      period: '30d',
    }).then((res: any) => {
      const pv = (res.top_stats as { change: number; name: string; value: number }[]).find(
        (s) => s.name === 'Total pageviews',
      );
      if (pv) {
        setGrow(pv.change);
        setPageviews(pv.value);
      }
    });
  }, [domain]);
  return (
    <>
      {grow !== null && pageviews !== null && (
        <Link
          variant="plain"
          href={`/analytics/${domain}`}
          tabIndex={-1}
          tooltip={'Click to view analytics'}
          aria-label={'View analytics'}
          tw="flex flex-row items-end space-x-1"
        >
          <Text size="xl" tw="leading-none">
            {pageviews}
          </Text>
          <span
            tw="flex flex-row items-end"
            css={grow > 0 ? tw`text-green-900` : tw`text-yellow-1000`}
          >
            <ArrowUp size={14} css={grow <= 0 && tw`transform rotate-180`} />
            <Text size="xs" tw="leading-none" style={{ color: 'inherit' }}>
              {`${100}`}%
            </Text>
          </span>
        </Link>
      )}
    </>
  );
}
