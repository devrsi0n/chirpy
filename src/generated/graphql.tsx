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

export type Page = {
  __typename?: 'Page';
  id: Scalars['String'];
  url: Scalars['String'];
  title: Scalars['String'];
  project: Project;
  comments: Array<Comment>;
};


export type PageCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CommentWhereUniqueInput>;
  after?: Maybe<CommentWhereUniqueInput>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  content: Scalars['String'];
  page: Page;
  replies: Array<Comment>;
  user: User;
};


export type CommentRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CommentWhereUniqueInput>;
  after?: Maybe<CommentWhereUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  page?: Maybe<Page>;
  currentUser?: Maybe<User>;
  getOrCreatePage?: Maybe<Page>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};


export type QueryGetOrCreatePageArgs = {
  projectId: Scalars['String'];
  url: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneProject: Project;
  createOnePage: Page;
};


export type MutationCreateOneProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateOnePageArgs = {
  data: PageCreateInput;
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

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
};

export type PageWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type ProjectCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectInput>;
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateManyWithoutProjectInput>;
};

export type PageCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  title: Scalars['String'];
  comments?: Maybe<CommentCreateManyWithoutPageInput>;
  project: ProjectCreateOneWithoutPagesInput;
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

export type PageCreateManyWithoutProjectInput = {
  create?: Maybe<Array<PageCreateWithoutProjectInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutProjectInput>>;
};

export type CommentCreateManyWithoutPageInput = {
  create?: Maybe<Array<CommentCreateWithoutPageInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutPageInput>>;
};

export type ProjectCreateOneWithoutPagesInput = {
  create?: Maybe<ProjectCreateWithoutPagesInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
  connectOrCreate?: Maybe<ProjectCreateOrConnectWithoutPageInput>;
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
  comment?: Maybe<CommentCreateManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutProjectInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutProjectsInput;
};

export type PageCreateWithoutProjectInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  title: Scalars['String'];
  comments?: Maybe<CommentCreateManyWithoutPageInput>;
};

export type PageCreateOrConnectWithoutProjectInput = {
  where: PageWhereUniqueInput;
  create: PageCreateWithoutProjectInput;
};

export type CommentCreateWithoutPageInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['String'];
  user: UserCreateOneWithoutCommentInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
};

export type CommentCreateOrConnectWithoutPageInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutPageInput;
};

export type ProjectCreateWithoutPagesInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectInput>;
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
};

export type ProjectCreateOrConnectWithoutPageInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutPagesInput;
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

export type CommentCreateManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutUserInput>>;
};

export type UserCreateOneWithoutCommentInput = {
  create?: Maybe<UserCreateWithoutCommentInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutCommentInput>;
};

export type CommentCreateManyWithoutCommentInput = {
  create?: Maybe<Array<CommentCreateWithoutCommentInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutCommentInput>>;
};

export type CommentCreateOneWithoutRepliesInput = {
  create?: Maybe<CommentCreateWithoutRepliesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutCommentInput>;
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

export type CommentCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['String'];
  page: PageCreateOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
};

export type CommentCreateOrConnectWithoutUserInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutUserInput;
};

export type UserCreateWithoutCommentInput = {
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
  projects?: Maybe<ProjectCreateManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutCommentInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutCommentInput;
};

export type CommentCreateWithoutCommentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['String'];
  user: UserCreateOneWithoutCommentInput;
  page: PageCreateOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
};

export type CommentCreateOrConnectWithoutCommentInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutCommentInput;
};

export type CommentCreateWithoutRepliesInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['String'];
  user: UserCreateOneWithoutCommentInput;
  page: PageCreateOneWithoutCommentsInput;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
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

export type PageCreateOneWithoutCommentsInput = {
  create?: Maybe<PageCreateWithoutCommentsInput>;
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutCommentInput>;
};

export type ProjectCreateManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutUserInput>>;
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
  comment?: Maybe<CommentCreateManyWithoutUserInput>;
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

export type PageCreateWithoutCommentsInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  title: Scalars['String'];
  project: ProjectCreateOneWithoutPagesInput;
};

export type PageCreateOrConnectWithoutCommentInput = {
  where: PageWhereUniqueInput;
  create: PageCreateWithoutCommentsInput;
};

export type ProjectCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectInput>;
  pages?: Maybe<PageCreateManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutUserInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutUserInput;
};

export type ProjectCreateManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutTeamInput>>;
};

export type ProjectCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateManyWithoutProjectInput>;
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

export type PageByProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
  url: Scalars['String'];
  title: Scalars['String'];
}>;


export type PageByProjectQuery = (
  { __typename?: 'Query' }
  & { getOrCreatePage?: Maybe<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'url' | 'title'>
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
export const PageByProjectDocument = gql`
    query pageByProject($projectId: String!, $url: String!, $title: String!) {
  getOrCreatePage(projectId: $projectId, url: $url, title: $title) {
    id
    url
    title
  }
}
    `;

/**
 * __usePageByProjectQuery__
 *
 * To run a query within a React component, call `usePageByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageByProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      url: // value for 'url'
 *      title: // value for 'title'
 *   },
 * });
 */
export function usePageByProjectQuery(baseOptions?: Apollo.QueryHookOptions<PageByProjectQuery, PageByProjectQueryVariables>) {
        return Apollo.useQuery<PageByProjectQuery, PageByProjectQueryVariables>(PageByProjectDocument, baseOptions);
      }
export function usePageByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageByProjectQuery, PageByProjectQueryVariables>) {
          return Apollo.useLazyQuery<PageByProjectQuery, PageByProjectQueryVariables>(PageByProjectDocument, baseOptions);
        }
export type PageByProjectQueryHookResult = ReturnType<typeof usePageByProjectQuery>;
export type PageByProjectLazyQueryHookResult = ReturnType<typeof usePageByProjectLazyQuery>;
export type PageByProjectQueryResult = Apollo.QueryResult<PageByProjectQuery, PageByProjectQueryVariables>;