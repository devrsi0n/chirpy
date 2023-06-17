import { querySQL } from '@chirpy-dev/utils';

export async function getCurrentVisitors(): Promise<number> {
  const { data } = await querySQL<{ visits: number }>(
    `SELECT uniq(session_id) AS visits FROM analytics_hits
      WHERE timestamp >= (now() - interval 5 minute) FORMAT JSON`,
  );
  const [{ visits }] = data;
  return visits;
}
