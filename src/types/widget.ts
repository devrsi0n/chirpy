import { CommentDetailsSubscription, CommentTreeSubscription } from '$/graphql/generated/comment';
import { InsertOneLikeMutation } from '$/graphql/generated/like';

export type CommentLeafType = CommentTreeSubscription['comments'][number];
export type CommentDetailNode = CommentDetailsSubscription['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
