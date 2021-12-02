import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AllProjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Project', id: string }> };

export type ThemeProjectByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type ThemeProjectByPkQuery = { __typename?: 'query_root', projectByPk?: { __typename?: 'Project', id: string, name: string, theme?: any | null | undefined } | null | undefined };

export type ProjectByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type ProjectByPkQuery = { __typename?: 'query_root', projectByPk?: { __typename?: 'Project', id: string } | null | undefined };

export type UserProjectsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int'];
}>;


export type UserProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Project', id: string }> };

export type ProjectAnalyticsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['uuid'];
}>;


export type ProjectAnalyticsQuery = { __typename?: 'query_root', projectByPk?: { __typename?: 'Project', id: string, name: string, domain: string } | null | undefined };


export const AllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AllProjectsQuery, AllProjectsQueryVariables>;
export const ThemeProjectByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"themeProjectByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}}]}}]} as unknown as DocumentNode<ThemeProjectByPkQuery, ThemeProjectByPkQueryVariables>;
export const ProjectByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProjectByPkQuery, ProjectByPkQueryVariables>;
export const UserProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UserProjectsQuery, UserProjectsQueryVariables>;
export const ProjectAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectAnalytics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}}]}}]}}]} as unknown as DocumentNode<ProjectAnalyticsQuery, ProjectAnalyticsQueryVariables>;