import { useLocalStorage } from '@chirpy-dev/ui';

export type OrderBy = 'desc' | 'asc';

export function useCommentOrderBy() {
  return useLocalStorage<OrderBy>('desc', 'comment-order-by');
}
