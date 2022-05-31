import { CommentTimelineSubscription, CommentTreeSubscription } from '$/graphql/generated/comment';
import { InsertOneLikeMutation } from '$/graphql/generated/like';

export type CommentLeafType = CommentTreeSubscription['comments'][number];
export type CommentTimelineNode = CommentTimelineSubscription['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
