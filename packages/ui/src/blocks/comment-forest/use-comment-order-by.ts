import { useLocalStorage } from '../../hooks';

export type OrderBy = 'desc' | 'asc';

export function useCommentOrderBy() {
  return useLocalStorage<OrderBy>('asc', 'comment-order-by');
}
