export class QueryError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'QueryError';
    this.status = status;
  }
}

export const TINYBIRD_ORIGIN = 'https://api.tinybird.co';

export async function client<T>(
  path: string,
  params?: RequestInit,
): Promise<T> {
  const url = `${TINYBIRD_ORIGIN}/v0${path}`;
  const initParams = {
    ...params,
    headers: {
      ...params?.headers,
      Authorization: `Bearer ${process.env.TINYBIRD_ADMIN_TOKEN}`,
    },
  };
  // console.log({ url, initParams });
  const response = await fetch(url, initParams);
  type ClientResponse<T> = T & { error?: string };
  const data = (await response.json()) as ClientResponse<T>;

  if (!response.ok) {
    throw new QueryError(
      data?.error ?? 'Something went wrong with tinybird',
      response.status,
    );
  }
  return data;
}

type BasePipeParams = {
  limit: number;
  date_to: string;
  date_from: string;
  domain: string;
};

export type PipeParams<T> = Record<keyof T, string> & BasePipeParams;

export type BaseColumnType = 'String' | 'Date' | 'UInt64' | 'Float64';
export type ColumnType = BaseColumnType | `Nullable(${BaseColumnType})`;
export type Meta<T> = { name: keyof T; type: ColumnType };
export type Statistics = {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
};
export type QueryPipe<T> = {
  meta: Meta<T>[];
  data: T[];
  rows: number;
  statistics: Statistics;
};

export function queryPipe<P, D = P>(
  name: string,
  params: Partial<PipeParams<P>> = {},
): Promise<QueryPipe<D>> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    searchParams.set(key, value);
  });

  return client(`/pipes/${name}.json?${searchParams}`);
}

export type QuerySQL<T> = {
  meta: Meta<T>[];
  data: T[];
  rows: number;
  statistics: Statistics;
};

export function querySQL<T>(sql: string): Promise<QuerySQL<T>> {
  return client(`/sql?q=${sql}`);
}

export function getTinybirdDomain(domain: string) {
  return domain === 'localhost' ? `http://${domain}:3000` : `https://${domain}`;
}
