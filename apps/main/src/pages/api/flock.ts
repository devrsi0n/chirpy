import { TINYBIRD_ORIGIN } from '@chirpy-dev/utils';
import { log as axiomLog } from 'next-axiom';
import { NextRequest } from 'next/server';

import { edgeCors } from '../../server/common/edge-cors';

const DATASOURCE = 'analytics_events';

type TrackingEvent = {
  timestamp: string;
  action: 'page_hit';
  version: '1';
  session_id: string;
  payload: string;
};

type TrackingPayload = {
  'user-agent': string;
  locale: string;
  location: string;
  referrer: string;
  pathname: string;
  href: string;
};

const log = axiomLog.with({
  scope: 'api-flock',
});

export default async function flock(req: NextRequest) {
  try {
    const reqBody: TrackingEvent = await req.json();
    const payload: TrackingPayload = JSON.parse(reqBody.payload);
    const hrefOrigin = payload.href ? new URL(payload.href).origin : '';
    const referer =
      req.headers.get('referer') || req.headers.get('referrer') || hrefOrigin;
    const response = await fetch(
      `${TINYBIRD_ORIGIN}/v0/events?name=${DATASOURCE}&token=${process.env.TINYBIRD_ADMIN_TOKEN}`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...reqBody,
          payload: JSON.stringify({
            ...payload,
            referrer: payload.referrer || hrefOrigin,
          }),
        }),
        headers: {
          'Content-Type': 'application/json',
          Referer: referer,
          Referrer: referer,
          Origin: req.headers.get('origin') || '',
          'User-Agent': req.headers.get('user-agent') || '',
        },
      },
    );
    return edgeCors(
      req,
      new Response(JSON.stringify(await response.json()), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  } catch (error) {
    log.error('Error while sending tracking event to Tinybird', error as Error);
    throw error;
  } finally {
    await log.flush();
  }
}

export const config = {
  runtime: 'edge',
};
