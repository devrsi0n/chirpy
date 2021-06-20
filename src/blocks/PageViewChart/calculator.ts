import dayjs from 'dayjs';

import { ProjectAnalyticsQuery } from '$server/graphql/generated/project';

import { PageView, ViewType } from './type';

type SessionsOfProject = NonNullable<ProjectAnalyticsQuery['projectByPk']>['sessionsYesterday'];

export function getPageViews(sessions: SessionsOfProject): PageView[] {
  const pageView: {
    [date in string]: {
      pv: number;
      uv: number;
      hasRecordUV: boolean;
    };
  } = {};
  for (const session of sessions) {
    for (const event of session.events) {
      const date = dayjs(event.created_at).format('H');
      if (pageView[date]) {
        pageView[date].pv += 1;
        if (!pageView[date].hasRecordUV) {
          pageView[date].uv += 1;
          pageView[date].hasRecordUV = true;
        }
      } else {
        pageView[date] = {
          pv: 1,
          uv: 0,
          hasRecordUV: false,
        };
      }
    }
  }

  const result: PageView[] = [];
  for (let i = 1; i <= 24; i++) {
    if (pageView[i]) {
      const { pv, uv } = pageView[i];
      result.push({
        date: String(i),
        pvBar: pv - uv,
        uvBar: uv,
      });
    } else {
      result.push({
        date: String(i),
        pvBar: 0,
        uvBar: 0,
      });
    }
  }

  return result;
}

export function getSumOfPageView(sessions: SessionsOfProject): Record<ViewType, number> {
  let pv = 0;
  let uv = 0;
  for (const session of sessions) {
    pv += session.events.length;
    if (session.events.length > 0) {
      uv++;
    }
  }
  return { pv, uv };
}
