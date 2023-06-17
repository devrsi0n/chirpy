import { TINYBIRD_ORIGIN } from '@chirpy-dev/utils';
import { log } from 'next-axiom';
import { NextRequest } from 'next/server';

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

/**
 * Tinybird proxy fixed API path, can't use alternative paths
 */
export default async function tracking(req: NextRequest) {
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
    return response;
  } catch (error) {
    log.error('Error while sending tracking event to Tinybird', error);
    throw error;
  }
}

export const config = {
  runtime: 'edge',
};
