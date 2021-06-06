import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ThemeProjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ThemeProjectsQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id'>
  )> }
);

export type ThemeProjectByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type ThemeProjectByPkQuery = (
  { __typename?: 'query_root' }
  & { projectByPk?: Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'theme'>
  )> }
);

export type ProjectByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type ProjectByPkQuery = (
  { __typename?: 'query_root' }
  & { projectByPk?: Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id'>
  )> }
);


export const ThemeProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"themeProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ThemeProjectsQuery, ThemeProjectsQueryVariables>;
export const ThemeProjectByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"themeProjectByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}}]}}]} as unknown as DocumentNode<ThemeProjectByPkQuery, ThemeProjectByPkQueryVariables>;
export const ProjectByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProjectByPkQuery, ProjectByPkQueryVariables>;