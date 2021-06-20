import * as Types from './types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AllProjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = (
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

export type ProjectsOfDashboardQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  today: Types.Scalars['timestamptz'];
  yesterday: Types.Scalars['timestamptz'];
  twoDaysAgo: Types.Scalars['timestamptz'];
}>;


export type ProjectsOfDashboardQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'createdAt'>
    & { pages: Array<(
      { __typename?: 'Page' }
      & Pick<Types.Page, 'id' | 'title' | 'url'>
    )>, sessionsYesterday: Array<(
      { __typename?: 'Session' }
      & { events_aggregate: (
        { __typename?: 'Event_aggregate' }
        & { aggregate?: Types.Maybe<(
          { __typename?: 'Event_aggregate_fields' }
          & Pick<Types.Event_Aggregate_Fields, 'count'>
        )>, nodes: Array<(
          { __typename?: 'Event' }
          & Pick<Types.Event, 'created_at'>
        )> }
      ) }
    )>, sessionsTwoDaysAgo: Array<(
      { __typename?: 'Session' }
      & { events_aggregate: (
        { __typename?: 'Event_aggregate' }
        & { aggregate?: Types.Maybe<(
          { __typename?: 'Event_aggregate_fields' }
          & Pick<Types.Event_Aggregate_Fields, 'count'>
        )>, nodes: Array<(
          { __typename?: 'Event' }
          & Pick<Types.Event, 'created_at'>
        )> }
      ) }
    )> }
  )> }
);

export type ProjectAnalyticsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['uuid'];
  today: Types.Scalars['timestamptz'];
  yesterday: Types.Scalars['timestamptz'];
  twoDaysAgo: Types.Scalars['timestamptz'];
}>;


export type ProjectAnalyticsQuery = (
  { __typename?: 'query_root' }
  & { projectByPk?: Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'domain'>
    & { sessionsYesterday: Array<(
      { __typename?: 'Session' }
      & { events: Array<(
        { __typename?: 'Event' }
        & Pick<Types.Event, 'created_at'>
      )> }
    )>, sessionsTwoDaysAgo: Array<(
      { __typename?: 'Session' }
      & { events: Array<(
        { __typename?: 'Event' }
        & Pick<Types.Event, 'created_at'>
      )> }
    )> }
  )> }
);


export const AllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AllProjectsQuery, AllProjectsQueryVariables>;
export const ThemeProjectByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"themeProjectByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}}]}}]} as unknown as DocumentNode<ThemeProjectByPkQuery, ThemeProjectByPkQueryVariables>;
export const ProjectByPkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectByPk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProjectByPkQuery, ProjectByPkQueryVariables>;
export const ProjectsOfDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectsOfDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"today"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yesterday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"twoDaysAgo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"pages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"sessionsYesterday"},"name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"pageview","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yesterday"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"today"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"columns"},"value":{"kind":"EnumValue","value":"id"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"sessionsTwoDaysAgo"},"name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"pageview","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"twoDaysAgo"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yesterday"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"columns"},"value":{"kind":"EnumValue","value":"id"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsOfDashboardQuery, ProjectsOfDashboardQueryVariables>;
export const ProjectAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectAnalytics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"today"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yesterday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"twoDaysAgo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","alias":{"kind":"Name","value":"sessionsYesterday"},"name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"pageview","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yesterday"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"today"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"sessionsTwoDaysAgo"},"name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"pageview","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"twoDaysAgo"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yesterday"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectAnalyticsQuery, ProjectAnalyticsQueryVariables>;