import { CommentsInPageQuery } from '$/generated/graphql';

export type PageInWidget = CommentsInPageQuery['page'];
export type NonNullablePage = NonNullable<PageInWidget>;
export type CommentInWidget = NonNullablePage['comments'][number];
