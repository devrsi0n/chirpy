import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type InsertOneProjectMutationVariables = Types.Exact<{
  teamId?: Types.InputMaybe<Types.Scalars['uuid']>;
  name: Types.Scalars['String'];
  domain: Types.Scalars['String'];
}>;

export type InsertOneProjectMutation = {
  __typename?: 'mutation_root';
  insertOneProject?: {
    __typename?: 'Project';
    id: string;
    name: string;
    teamId?: string | null;
    userId?: string | null;
  } | null;
};

export type DeleteProjectByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteProjectByPkMutation = {
  __typename?: 'mutation_root';
  deleteProjectByPk?: { __typename?: 'Project'; id: string } | null;
};

export type UpdateThemeMutationVariables = Types.Exact<{
  projectId: Types.Scalars['uuid'];
  theme: Types.Scalars['jsonb'];
}>;

export type UpdateThemeMutation = {
  __typename?: 'mutation_root';
  updateProjectByPk?: { __typename?: 'Project'; id: string } | null;
};

export const InsertOneProjectDocument = gql`
  mutation insertOneProject($teamId: uuid, $name: String!, $domain: String!) {
    insertOneProject(object: { teamId: $teamId, name: $name, domain: $domain }) {
      id
      name
      teamId
      userId
    }
  }
`;

export function useInsertOneProjectMutation() {
  return Urql.useMutation<InsertOneProjectMutation, InsertOneProjectMutationVariables>(
    InsertOneProjectDocument,
  );
}
export const DeleteProjectByPkDocument = gql`
  mutation deleteProjectByPk($id: uuid!) {
    deleteProjectByPk(id: $id) {
      id
    }
  }
`;

export function useDeleteProjectByPkMutation() {
  return Urql.useMutation<DeleteProjectByPkMutation, DeleteProjectByPkMutationVariables>(
    DeleteProjectByPkDocument,
  );
}
export const UpdateThemeDocument = gql`
  mutation updateTheme($projectId: uuid!, $theme: jsonb!) {
    updateProjectByPk(pk_columns: { id: $projectId }, _set: { theme: $theme }) {
      id
    }
  }
`;

export function useUpdateThemeMutation() {
  return Urql.useMutation<UpdateThemeMutation, UpdateThemeMutationVariables>(UpdateThemeDocument);
}
