import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentUserQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type CurrentUserQuery = { __typename?: 'query_root', userByPk?: { __typename?: 'User', id: string, email?: string | null | undefined, username?: string | null | undefined, name?: string | null | undefined, avatar?: string | null | undefined, bio?: string | null | undefined, website?: string | null | undefined, twitterUserName?: string | null | undefined } | null | undefined };

export type UpdateUserByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  bio?: Types.InputMaybe<Types.Scalars['String']>;
  name: Types.Scalars['String'];
  twitterUserName?: Types.InputMaybe<Types.Scalars['String']>;
  website?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UpdateUserByPkMutation = { __typename?: 'mutation_root', updateUserByPk?: { __typename?: 'User', id: string } | null | undefined };

export type UpdateUserFieldsMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  email: Types.Scalars['String'];
  name: Types.Scalars['String'];
  username: Types.Scalars['String'];
}>;


export type UpdateUserFieldsMutation = { __typename?: 'mutation_root', updateUserByPk?: { __typename?: 'User', id: string } | null | undefined };

export type UserDashboardProjectsQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type UserDashboardProjectsQuery = { __typename?: 'query_root', userByPk?: { __typename?: 'User', id: string, projects: Array<{ __typename?: 'Project', id: string, name: string, domain: string, createdAt: string, pages: Array<{ __typename?: 'Page', id: string, title?: string | null | undefined, url: string }> }> } | null | undefined };


export const CurrentUserDocument = gql`
    query currentUser($id: uuid!) {
  userByPk(id: $id) {
    id
    email
    username
    name
    avatar
    bio
    website
    twitterUserName
  }
}
    `;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};
export const UpdateUserByPkDocument = gql`
    mutation updateUserByPk($id: uuid!, $bio: String, $name: String!, $twitterUserName: String, $website: String) {
  updateUserByPk(
    pk_columns: {id: $id}
    _set: {bio: $bio, name: $name, twitterUserName: $twitterUserName, website: $website}
  ) {
    id
  }
}
    `;

export function useUpdateUserByPkMutation() {
  return Urql.useMutation<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>(UpdateUserByPkDocument);
};
export const UpdateUserFieldsDocument = gql`
    mutation updateUserFields($id: uuid!, $email: String!, $name: String!, $username: String!) {
  updateUserByPk(
    pk_columns: {id: $id}
    _set: {email: $email, name: $name, username: $username}
  ) {
    id
  }
}
    `;

export function useUpdateUserFieldsMutation() {
  return Urql.useMutation<UpdateUserFieldsMutation, UpdateUserFieldsMutationVariables>(UpdateUserFieldsDocument);
};
export const UserDashboardProjectsDocument = gql`
    query userDashboardProjects($id: uuid!) {
  userByPk(id: $id) {
    id
    projects {
      id
      name
      domain
      createdAt
      pages {
        id
        title
        url
      }
    }
  }
}
    `;

export function useUserDashboardProjectsQuery(options: Omit<Urql.UseQueryArgs<UserDashboardProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserDashboardProjectsQuery>({ query: UserDashboardProjectsDocument, ...options });
};