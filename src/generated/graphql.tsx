import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  DateTime: any;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  members: Array<Member>;
  projects: Array<Project>;
};


export type UserMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MemberWhereUniqueInput>;
  after?: Maybe<MemberWhereUniqueInput>;
};


export type UserProjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProjectWhereUniqueInput>;
  after?: Maybe<ProjectWhereUniqueInput>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['String'];
  name: Scalars['String'];
  project: Array<Project>;
  members: Array<Member>;
};


export type TeamProjectArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProjectWhereUniqueInput>;
  after?: Maybe<ProjectWhereUniqueInput>;
};


export type TeamMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MemberWhereUniqueInput>;
  after?: Maybe<MemberWhereUniqueInput>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  name: Scalars['String'];
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['String'];
  role: Role;
  user: User;
  team: Team;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  currentUser?: Maybe<User>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneProject: Project;
};


export type MutationCreateOneProjectArgs = {
  data: ProjectCreateInput;
};

export type MemberWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type ProjectWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
};

export type ProjectCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectInput>;
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
};


export type TeamCreateOneWithoutProjectInput = {
  create?: Maybe<TeamCreateWithoutProjectInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutProjectInput>;
};

export type UserCreateOneWithoutProjectsInput = {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutProjectInput>;
};

export type TeamCreateWithoutProjectInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  members?: Maybe<MemberCreateManyWithoutTeamInput>;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type TeamCreateOrConnectWithoutProjectInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutProjectInput;
};

export type UserCreateWithoutProjectsInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  email: Scalars['String'];
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  type?: Maybe<UserType>;
  members?: Maybe<MemberCreateManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutProjectInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutProjectsInput;
};

export type MemberCreateManyWithoutTeamInput = {
  create?: Maybe<Array<MemberCreateWithoutTeamInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutTeamInput>>;
};

export enum UserType {
  Free = 'FREE',
  Pro = 'PRO'
}

export type MemberCreateManyWithoutUserInput = {
  create?: Maybe<Array<MemberCreateWithoutUserInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutUserInput>>;
};

export type MemberCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<Role>;
  user: UserCreateOneWithoutMembersInput;
};

export type MemberCreateOrConnectWithoutTeamInput = {
  where: MemberWhereUniqueInput;
  create: MemberCreateWithoutTeamInput;
};

export type MemberCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<Role>;
  team: TeamCreateOneWithoutMembersInput;
};

export type MemberCreateOrConnectWithoutUserInput = {
  where: MemberWhereUniqueInput;
  create: MemberCreateWithoutUserInput;
};

export type UserCreateOneWithoutMembersInput = {
  create?: Maybe<UserCreateWithoutMembersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutMemberInput>;
};

export type TeamCreateOneWithoutMembersInput = {
  create?: Maybe<TeamCreateWithoutMembersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutMemberInput>;
};

export type UserCreateWithoutMembersInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  email: Scalars['String'];
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  type?: Maybe<UserType>;
  projects?: Maybe<ProjectCreateManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutMemberInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMembersInput;
};

export type TeamCreateWithoutMembersInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  project?: Maybe<ProjectCreateManyWithoutTeamInput>;
};

export type TeamCreateOrConnectWithoutMemberInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutMembersInput;
};

export type ProjectCreateManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutUserInput>>;
};

export type ProjectCreateManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutTeamInput>>;
};

export type ProjectCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutUserInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutUserInput;
};

export type ProjectCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
};

export type ProjectCreateOrConnectWithoutTeamInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutTeamInput;
};

export type CreateOneProjectMutationVariables = Exact<{
  projectName: Scalars['String'];
  userID: Scalars['String'];
}>;


export type CreateOneProjectMutation = (
  { __typename?: 'Mutation' }
  & { createOneProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'avatar'>
    & { members: Array<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'role'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
        & { project: Array<(
          { __typename?: 'Project' }
          & Pick<Project, 'id' | 'name'>
        )> }
      ) }
    )>, projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )> }
  )> }
);


export const CreateOneProjectDocument = gql`
    mutation createOneProject($projectName: String!, $userID: String!) {
  createOneProject(data: {name: $projectName, user: {connect: {id: $userID}}}) {
    id
    name
  }
}
    `;
export type CreateOneProjectMutationFn = Apollo.MutationFunction<CreateOneProjectMutation, CreateOneProjectMutationVariables>;

/**
 * __useCreateOneProjectMutation__
 *
 * To run a mutation, you first call `useCreateOneProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneProjectMutation, { data, loading, error }] = useCreateOneProjectMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useCreateOneProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneProjectMutation, CreateOneProjectMutationVariables>) {
        return Apollo.useMutation<CreateOneProjectMutation, CreateOneProjectMutationVariables>(CreateOneProjectDocument, baseOptions);
      }
export type CreateOneProjectMutationHookResult = ReturnType<typeof useCreateOneProjectMutation>;
export type CreateOneProjectMutationResult = Apollo.MutationResult<CreateOneProjectMutation>;
export type CreateOneProjectMutationOptions = Apollo.BaseMutationOptions<CreateOneProjectMutation, CreateOneProjectMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    email
    name
    avatar
    members {
      id
      role
      team {
        id
        name
        project {
          id
          name
        }
      }
    }
    projects {
      id
      name
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;