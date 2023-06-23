import { querySQL } from '@chirpy-dev/utils';
import { z } from 'zod';

export const CURRENT_VISITORS_INPUT = z.object({
  domain: z.string(),
});

export async function getCurrentVisitors({
  domain,
}: z.infer<typeof CURRENT_VISITORS_INPUT>): Promise<number> {
  const { data } = await querySQL<{ visits: number }>(
    `SELECT uniq(session_id) AS visits FROM analytics_hits
      WHERE timestamp >= (now() - interval 5 minute) and startsWith(href, '${domain}')
      FORMAT JSON`,
  );
  const [{ visits }] = data;
  return visits;
}
