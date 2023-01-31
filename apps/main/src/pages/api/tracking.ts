import { NextRequest } from 'next/server';

const HOST = 'api.us-east.tinybird.co';
const DATASOURCE = 'analytics_events';

export default async function tracking(req: NextRequest) {
  const response = await fetch(
    `https://${HOST}/v0/events?name=${DATASOURCE}&token=${process.env.NEXT_PUBLIC_TINYBIRD_FLOCK_TOKEN}`,
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
