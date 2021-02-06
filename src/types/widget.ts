import { CommentDetailsQuery, CommentsByPageQuery } from '$/graphql/generated/comment';
import { CreateOneLikeMutation } from '$/graphql/generated/like';

export type CommentByPage = CommentsByPageQuery['comments'][number];
export type CommentDetails = CommentDetailsQuery['comment'];
export type CreateOneLike = CreateOneLikeMutation['createOneLike'];
