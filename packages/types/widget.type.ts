import {
  CommentDetailsSubscription,
  CommentTreeSubscription,
} from '@chirpy/client-graphql/generated/comment';
import { InsertOneLikeMutation } from '@chirpy/client-graphql/generated/like';

export type CommentLeafType = CommentTreeSubscription['comments'][number];
export type CommentDetailNode = CommentDetailsSubscription['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
