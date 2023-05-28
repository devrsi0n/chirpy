import { SWRResponse } from 'swr';

export type ClientResponse<T> = T & { error?: string };

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

export type QuerySQL<T> = {
  meta: Meta<T>[];
  data: T[];
  rows: number;
  statistics: Statistics;
};

export type PipeParams<T> = Record<keyof T, string> & {
  limit: number;
  date_to: string;
  date_from: string;
};

export type QueryStatus = 'idle' | 'loading' | 'updating' | 'error' | 'success';

export class QueryError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'QueryError';
    this.status = status;
  }
}

export type QueryResponse<T> = SWRResponse<T> & {
  warning: QueryError | null;
  status: QueryStatus;
};
