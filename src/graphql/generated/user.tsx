import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentUserQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type CurrentUserQuery = {
  __typename?: 'query_root';
  userByPk?: {
    __typename?: 'User';
    id: string;
    email?: string | null;
    username?: string | null;
    name?: string | null;
    avatar?: string | null;
    bio?: string | null;
    website?: string | null;
    twitterUserName?: string | null;
  } | null;
};

export type UpdateUserByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  bio?: Types.InputMaybe<Types.Scalars['String']>;
  name: Types.Scalars['String'];
  twitterUserName?: Types.InputMaybe<Types.Scalars['String']>;
  website?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type UpdateUserByPkMutation = {
  __typename?: 'mutation_root';
  updateUserByPk?: { __typename?: 'User'; id: string } | null;
};

export type UpdateUserFieldsMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  email: Types.Scalars['String'];
  name: Types.Scalars['String'];
  username: Types.Scalars['String'];
}>;

export type UpdateUserFieldsMutation = {
  __typename?: 'mutation_root';
  updateUserByPk?: { __typename?: 'User'; id: string } | null;
};

export type UserDashboardProjectsQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type UserDashboardProjectsQuery = {
  __typename?: 'query_root';
  userByPk?: {
    __typename?: 'User';
    id: string;
    projects: Array<{
      __typename?: 'Project';
      id: string;
      name: string;
      domain: string;
      createdAt: string;
      pages: Array<{ __typename?: 'Page'; id: string; title?: string | null; url: string }>;
    }>;
  } | null;
};

export type DeleteUserMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteUserMutation = {
  __typename?: 'mutation_root';
  deleteUserByPk?: { __typename?: 'User'; id: string } | null;
};

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

export function useCurrentUserQuery(
  options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
}
export const UpdateUserByPkDocument = gql`
  mutation updateUserByPk(
    $id: uuid!
    $bio: String
    $name: String!
    $twitterUserName: String
    $website: String
  ) {
    updateUserByPk(
      pk_columns: { id: $id }
      _set: { bio: $bio, name: $name, twitterUserName: $twitterUserName, website: $website }
    ) {
      id
    }
  }
`;

export function useUpdateUserByPkMutation() {
  return Urql.useMutation<UpdateUserByPkMutation, UpdateUserByPkMutationVariables>(
    UpdateUserByPkDocument,
  );
}
export const UpdateUserFieldsDocument = gql`
  mutation updateUserFields($id: uuid!, $email: String!, $name: String!, $username: String!) {
    updateUserByPk(
      pk_columns: { id: $id }
      _set: { email: $email, name: $name, username: $username }
    ) {
      id
    }
  }
`;

export function useUpdateUserFieldsMutation() {
  return Urql.useMutation<UpdateUserFieldsMutation, UpdateUserFieldsMutationVariables>(
    UpdateUserFieldsDocument,
  );
}
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

export function useUserDashboardProjectsQuery(
  options: Omit<Urql.UseQueryArgs<UserDashboardProjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserDashboardProjectsQuery>({
    query: UserDashboardProjectsDocument,
    ...options,
  });
}
export const DeleteUserDocument = gql`
  mutation deleteUser($id: uuid!) {
    deleteUserByPk(id: $id) {
      id
    }
  }
`;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
}
