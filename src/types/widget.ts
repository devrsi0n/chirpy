import { CommentDetailsQuery, CommentTreeQuery } from '$/graphql/generated/comment';

import { InsertOneLikeMutation } from '$/graphql/generated/like';

export type CommentLeafType = CommentTreeQuery['comments'][number];
export type CommentDetailNode = CommentDetailsQuery['commentByPk'];
export type InsertOneLike = NonNullable<InsertOneLikeMutation['insertOneLike']>;
