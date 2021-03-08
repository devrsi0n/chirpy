import { CommentDetailsQuery, CommentTreeQuery } from '$server/graphql/generated/comment';
import { InsertOneLikeMutation } from '$/graphql/generated/like';

export type CommentLeaf = CommentTreeQuery['comments'][number];
export type CommentDetailNode = CommentDetailsQuery['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
