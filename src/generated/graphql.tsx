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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Member>>;
};

export type UserMembersArgs = {
  where?: Maybe<MemberWhereInput>;
  orderBy?: Maybe<Array<MemberOrderByInput>>;
  cursor?: Maybe<MemberWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<MemberDistinctFieldEnum>>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  teamId: Scalars['String'];
  role: Role;
  user: User;
  team: Team;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export type Team = {
  __typename?: 'Team';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  members?: Maybe<Array<Member>>;
  project?: Maybe<Array<Project>>;
};

export type TeamMembersArgs = {
  where?: Maybe<MemberWhereInput>;
  orderBy?: Maybe<Array<MemberOrderByInput>>;
  cursor?: Maybe<MemberWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<MemberDistinctFieldEnum>>;
};

export type TeamProjectArgs = {
  where?: Maybe<ProjectWhereInput>;
  orderBy?: Maybe<Array<ProjectOrderByInput>>;
  cursor?: Maybe<ProjectWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<ProjectDistinctFieldEnum>>;
};

export type MemberWhereInput = {
  AND?: Maybe<Array<MemberWhereInput>>;
  OR?: Maybe<Array<MemberWhereInput>>;
  NOT?: Maybe<Array<MemberWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserRelationFilter>;
  userId?: Maybe<StringFilter>;
  team?: Maybe<TeamRelationFilter>;
  teamId?: Maybe<StringFilter>;
  role?: Maybe<EnumRoleFilter>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type UserRelationFilter = {
  is?: Maybe<UserWhereInput>;
  isNot?: Maybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  googleUserId?: Maybe<StringNullableFilter>;
  githubUserId?: Maybe<StringNullableFilter>;
  avatar?: Maybe<StringNullableFilter>;
  members?: Maybe<MemberListRelationFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type MemberListRelationFilter = {
  every?: Maybe<MemberWhereInput>;
  some?: Maybe<MemberWhereInput>;
  none?: Maybe<MemberWhereInput>;
};

export type TeamRelationFilter = {
  is?: Maybe<TeamWhereInput>;
  isNot?: Maybe<TeamWhereInput>;
};

export type TeamWhereInput = {
  AND?: Maybe<Array<TeamWhereInput>>;
  OR?: Maybe<Array<TeamWhereInput>>;
  NOT?: Maybe<Array<TeamWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringFilter>;
  members?: Maybe<MemberListRelationFilter>;
  project?: Maybe<ProjectListRelationFilter>;
};

export type ProjectListRelationFilter = {
  every?: Maybe<ProjectWhereInput>;
  some?: Maybe<ProjectWhereInput>;
  none?: Maybe<ProjectWhereInput>;
};

export type ProjectWhereInput = {
  AND?: Maybe<Array<ProjectWhereInput>>;
  OR?: Maybe<Array<ProjectWhereInput>>;
  NOT?: Maybe<Array<ProjectWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringFilter>;
  team?: Maybe<TeamRelationFilter>;
  teamId?: Maybe<StringFilter>;
};

export type EnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  notIn?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
};

export type NestedEnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  notIn?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
};

export type MemberOrderByInput = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
  role?: Maybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type MemberWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum MemberDistinctFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  TeamId = 'teamId',
  Role = 'role',
}

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  teamId: Scalars['String'];
  team: Team;
};

export type ProjectOrderByInput = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
};

export type ProjectWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum ProjectDistinctFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Name = 'name',
  TeamId = 'teamId',
}

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
};

export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};

export type ProjectCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team: TeamCreateOneWithoutProjectInput;
};

export type TeamCreateOneWithoutProjectInput = {
  create?: Maybe<TeamCreateWithoutProjectInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutProjectInput>;
};

export type TeamCreateWithoutProjectInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  members?: Maybe<MemberCreateManyWithoutTeamInput>;
};

export type MemberCreateManyWithoutTeamInput = {
  create?: Maybe<Array<MemberCreateWithoutTeamInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutTeamInput>>;
};

export type MemberCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<Role>;
  user: UserCreateOneWithoutMembersInput;
};

export type UserCreateOneWithoutMembersInput = {
  create?: Maybe<UserCreateWithoutMembersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutMemberInput>;
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
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
};

export type UserCreateOrConnectWithoutMemberInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMembersInput;
};

export type MemberCreateOrConnectWithoutTeamInput = {
  where: MemberWhereUniqueInput;
  create: MemberCreateWithoutTeamInput;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type TeamCreateOrConnectWithoutProjectInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutProjectInput;
};

export type CreateProjectMutationVariables = Exact<{
  projectName: Scalars['String'];
  teamName: Scalars['String'];
  teamRole: Role;
  userId: Scalars['String'];
}>;

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'Project' } & Pick<Project, 'id' | 'name'> & {
      team: { __typename?: 'Team' } & Pick<Team, 'id' | 'name'> & {
          members?: Maybe<
            Array<
              { __typename?: 'Member' } & Pick<Member, 'id' | 'role'> & {
                  user: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
                }
            >
          >;
        };
    };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'User' } & Pick<User, 'id' | 'email' | 'name' | 'avatar'> & {
      members?: Maybe<Array<{ __typename?: 'Member' } & Pick<Member, 'id' | 'role' | 'teamId'>>>;
    };
};

export const CreateProjectDocument = gql`
  mutation createProject(
    $projectName: String!
    $teamName: String!
    $teamRole: Role!
    $userId: String!
  ) {
    createProject(
      data: {
        name: $projectName
        team: {
          create: {
            name: $teamName
            members: { create: { role: $teamRole, user: { connect: { id: $userId } } } }
          }
        }
      }
    ) {
      id
      name
      team {
        id
        name
        members {
          id
          role
          user {
            id
            name
          }
        }
      }
    }
  }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      teamName: // value for 'teamName'
 *      teamRole: // value for 'teamRole'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
) {
  return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    CreateProjectDocument,
    baseOptions,
  );
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
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
        teamId
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
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
