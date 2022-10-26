import {
  CommentTimelineSubscription,
  CommentTreeSubscription,
  InsertOneLikeMutation,
} from '@chirpy-dev/graphql';

export type CommentLeafType = CommentTreeSubscription['comments'][number];
export type CommentTimelineNode = CommentTimelineSubscription['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
