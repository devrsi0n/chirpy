import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CommentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CommentsQuery = (
  { __typename?: 'query_root' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id'>
  )> }
);


export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;