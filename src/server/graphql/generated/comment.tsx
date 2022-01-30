import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CommentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CommentsQuery = { __typename?: 'query_root', comments: Array<{ __typename?: 'Comment', id: string }> };

export type SiteOwnerByCommentIdQueryVariables = Types.Exact<{
  commentId: Types.Scalars['uuid'];
}>;


export type SiteOwnerByCommentIdQuery = { __typename?: 'query_root', commentByPk?: { __typename?: 'Comment', page: { __typename?: 'Page', url: string, project: { __typename?: 'Project', userId?: string | null | undefined } } } | null | undefined };


export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const SiteOwnerByCommentIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"siteOwnerByCommentId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SiteOwnerByCommentIdQuery, SiteOwnerByCommentIdQueryVariables>;