import { ParentSize } from '@visx/responsive';
import * as React from 'react';
import 'twin.macro';

import { ProjectAnalyticsQuery } from '$/server/graphql/generated/project';

import { NumberBlock } from './NumberBlock';
import { ViewChart } from './ViewChart';
import { getPageViews, getSumOfPageView } from './calculator';

export type PageViewChartProps = {
  project: ProjectAnalyticsQuery['projectByPk'];
};

export function PageViewChart({ project }: PageViewChartProps): JSX.Element {
  const pageViews = React.useMemo(
    () => project?.sessionsYesterday && getPageViews(project.sessionsYesterday),
    [project?.sessionsYesterday],
  );
  const sumYesterday = React.useMemo(
    () => (project ? getSumOfPageView(project.sessionsYesterday) : { pv: 0, uv: 0 }),
    [project],
  );
  const sumTwoDaysAgo = React.useMemo(
    () => (project ? getSumOfPageView(project.sessionsTwoDaysAgo) : { pv: 0, uv: 0 }),
    [project],
  );

  if (!pageViews) {
    return <></>;
  }
  return (
    <section tw="flex flex-col bg-white shadow-xl rounded p-4 space-y-4">
      <div tw="flex flex-row items-stretch space-x-6">
        <NumberBlock
          text="Page views"
          value={sumYesterday.pv}
          diffs={getDiffs(sumYesterday.pv, sumTwoDaysAgo.pv)}
        />
        <div role="separator" tw="bg-gray-200" style={{ width: 1 }} />
        <NumberBlock
          text="Visitors"
          value={sumYesterday.uv}
          diffs={getDiffs(sumYesterday.uv, sumTwoDaysAgo.uv)}
        />
      </div>
      <div tw="h-72">
        <ParentSize tw="">
          {({ width, height }) => <ViewChart width={width} height={height} pageViews={pageViews} />}
        </ParentSize>
      </div>
    </section>
  );
}

const getDiffs = (prev: number, curr: number) =>
  +(Math.round(((curr - prev) / prev) * 100) / 100).toFixed(2);
