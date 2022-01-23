import React from 'react';
import 'twin.macro';

import { Tabs } from '$/components/tabs';

import { Timer } from '../../timer';
import { Props } from '../../type';
import { AnalyticsCard } from '../fine-components';
import { PageRank } from './page-rank';

export interface PagesProps extends Props {
  timer: Timer;
}

export default function Pages(props: PagesProps): JSX.Element {
  return (
    <AnalyticsCard>
      <Tabs
        cacheKey="analytics.pages"
        initialValue="entry-pages"
        leftItem={<h3 tw="font-bold text-gray-1100">Pages</h3>}
      >
        <Tabs.Item label="Entry Pages" value="entry-pages">
          <PageRank
            site={props.site}
            query={props.query}
            timer={props.timer}
            apiPath="entry-pages"
            key="entry-pages"
          />
        </Tabs.Item>
        <Tabs.Item label="Exit Pages" value="exit-pages">
          <PageRank
            site={props.site}
            query={props.query}
            timer={props.timer}
            apiPath="exit-pages"
            key="exit-pages"
          />
        </Tabs.Item>
        <Tabs.Item label="Top Pages" value="pages">
          <PageRank
            site={props.site}
            query={props.query}
            timer={props.timer}
            apiPath="pages"
            key="pages"
          />
        </Tabs.Item>
      </Tabs>
    </AnalyticsCard>
  );
}
