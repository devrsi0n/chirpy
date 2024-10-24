import { trpc } from '@chirpy-dev/trpc/src/client';
import { IconArrowUp, Link, Text, Tooltip } from '@chirpy-dev/ui';
import { getTinybirdDomain, isSSRMode } from '@chirpy-dev/utils';
import clsx from 'clsx';
import * as React from 'react';

import { useCurrentUser } from '$/contexts';

export type PageViewStatsProps = {
  domain: string;
};

export function PageViewStats({ domain }: PageViewStatsProps): JSX.Element {
  const { data } = trpc.analytics.pageviewMetric.useQuery({
    domain: getTinybirdDomain(domain),
  });
  const pageviews = data?.pageviews;
  const growthRate = data?.growthRate;
  const { data: user } = useCurrentUser();

  if (typeof pageviews !== 'number') {
    return <></>;
  }
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link
            variant="plain"
            href={`/dashboard/${user.username}/${domain}/analytics`}
            aria-label={'View analytics'}
            className="flex items-center space-x-1"
            onClickCapture={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <Text size="xl" className="!leading-none" aria-label="Page views">
              {new Intl.NumberFormat(isSSRMode ? 'en-US' : navigator.language, {
                notation: 'compact',
              }).format(pageviews)}
            </Text>
            {typeof growthRate?.value === 'number' && (
              <div
                className={clsx(
                  'flex flex-row items-end rounded-full px-1.5 py-1 font-semibold',
                  growthRate.value > 0
                    ? `bg-green-300 text-green-1000`
                    : `bg-red-300 text-red-1100`,
                )}
              >
                <IconArrowUp
                  size={14}
                  className={clsx(growthRate.value <= 0 && `rotate-180`)}
                  strokeWidth={2}
                />
                <Text
                  size="xs"
                  className="!leading-none"
                  style={{ color: 'inherit' }}
                >
                  {growthRate.label}
                </Text>
              </div>
            )}
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={5}>
            <div>
              <Text>Pageview of last 7 days,</Text>
              <Text>click to view analytics details</Text>
            </div>
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
