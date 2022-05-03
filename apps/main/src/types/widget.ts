import { CommentDetailsSubscription, CommentTreeSubscription } from '@chirpy/graphql/generated/comment';
import { InsertOneLikeMutation } from '@chirpy/graphql/generated/like';

export type CommentLeafType = CommentTreeSubscription['comments'][number];
export type CommentDetailNode = CommentDetailsSubscription['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
