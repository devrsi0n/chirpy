import { TINYBIRD_ORIGIN } from '@chirpy-dev/utils';
import { log } from 'next-axiom';
import { NextRequest } from 'next/server';

const DATASOURCE = 'analytics_events';

export default async function tracking(req: NextRequest) {
  try {
    const response = await fetch(
      `${TINYBIRD_ORIGIN}/v0/events?name=${DATASOURCE}&token=${process.env.TINYBIRD_ADMIN_TOKEN}`,
      {
        method: 'POST',
        body: JSON.stringify(await req.json()),
        headers: {
          'Content-Type': 'application/json',
          Referer: req.headers.get('referer') || '',
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
