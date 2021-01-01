import { CommentsByPageQuery, CreateOneLikeMutation } from '$/generated/graphql';

export type CommentByPage = CommentsByPageQuery['comments'][number];
export type CreateOneLike = CreateOneLikeMutation['createOneLike'];
