import { TINYBIRD_ORIGIN } from '@chirpy-dev/utils';
import { NextRequest } from 'next/server';

const DATASOURCE = 'analytics_events';

export default async function tracking(req: NextRequest) {
  const response = await fetch(
    `${TINYBIRD_ORIGIN}/v0/events?name=${DATASOURCE}&token=${process.env.TINYBIRD_ADMIN_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify(await req.json()),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
}

export const config = {
  runtime: 'edge',
};
