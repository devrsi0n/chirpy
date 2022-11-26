import { Order_By } from '@chirpy-dev/graphql';

import { useLocalStorage } from '../../hooks';

export function useCommentOrderBy() {
  return useLocalStorage<Order_By>('asc', 'comment-order-by');
}
