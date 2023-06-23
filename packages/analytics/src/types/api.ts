export type QueryStatus = 'idle' | 'loading' | 'updating' | 'error' | 'success';

export class QueryError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'QueryError';
    this.status = status;
  }
}
