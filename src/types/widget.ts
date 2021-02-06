import {
  CommentDetailsQuery,
  CommentsByPageQuery,
  CreateOneLikeMutation,
} from '$/generated/graphql';

export type CommentByPage = CommentsByPageQuery['comments'][number];
export type CommentDetails = CommentDetailsQuery['comment'];
export type CreateOneLike = CreateOneLikeMutation['createOneLike'];
