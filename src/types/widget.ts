import { CommentsByPageQuery } from '$/generated/graphql';

export type CommentByPage = CommentsByPageQuery['comments'][number];
