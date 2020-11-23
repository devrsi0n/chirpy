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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  Json: any;
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
  content: Scalars['Json'];
  page: Page;
  replies: Array<Comment>;
  user: User;
  createdAt: Scalars['DateTime'];
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
  getAllCommentsByPage?: Maybe<Array<Maybe<Comment>>>;
  currentUser?: Maybe<User>;
  getOrCreatePage?: Maybe<Page>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};


export type QueryGetAllCommentsByPageArgs = {
  pageId: Scalars['String'];
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
  createOneComment: Comment;
};


export type MutationCreateOneProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateOnePageArgs = {
  data: PageCreateInput;
};


export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
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

export type CommentCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentInput;
  page: PageCreateOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
};

export type TeamCreateOneWithoutProjectInput = {
  create?: Maybe<TeamCreateWithoutProjectInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutprojectInput>;
};

export type UserCreateOneWithoutProjectsInput = {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutprojectsInput>;
};

export type PageCreateManyWithoutProjectInput = {
  create?: Maybe<Array<PageCreateWithoutProjectInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutprojectInput>>;
};

export type CommentCreateManyWithoutPageInput = {
  create?: Maybe<Array<CommentCreateWithoutPageInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutpageInput>>;
};

export type ProjectCreateOneWithoutPagesInput = {
  create?: Maybe<ProjectCreateWithoutPagesInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
  connectOrCreate?: Maybe<ProjectCreateOrConnectWithoutpagesInput>;
};

export type UserCreateOneWithoutCommentInput = {
  create?: Maybe<UserCreateWithoutCommentInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutcommentInput>;
};

export type PageCreateOneWithoutCommentsInput = {
  create?: Maybe<PageCreateWithoutCommentsInput>;
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutcommentsInput>;
};

export type CommentCreateManyWithoutCommentInput = {
  create?: Maybe<Array<CommentCreateWithoutCommentInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutcommentInput>>;
};

export type CommentCreateOneWithoutRepliesInput = {
  create?: Maybe<CommentCreateWithoutRepliesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutrepliesInput>;
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

export type TeamCreateOrConnectWithoutprojectInput = {
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

export type UserCreateOrConnectWithoutprojectsInput = {
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

export type PageCreateOrConnectWithoutprojectInput = {
  where: PageWhereUniqueInput;
  create: PageCreateWithoutProjectInput;
};

export type CommentCreateWithoutPageInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
};

export type CommentCreateOrConnectWithoutpageInput = {
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

export type ProjectCreateOrConnectWithoutpagesInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutPagesInput;
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

export type UserCreateOrConnectWithoutcommentInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutCommentInput;
};

export type PageCreateWithoutCommentsInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  title: Scalars['String'];
  project: ProjectCreateOneWithoutPagesInput;
};

export type PageCreateOrConnectWithoutcommentsInput = {
  where: PageWhereUniqueInput;
  create: PageCreateWithoutCommentsInput;
};

export type CommentCreateWithoutCommentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentInput;
  page: PageCreateOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
};

export type CommentCreateOrConnectWithoutcommentInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutCommentInput;
};

export type CommentCreateWithoutRepliesInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentInput;
  page: PageCreateOneWithoutCommentsInput;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
};

export type CommentCreateOrConnectWithoutrepliesInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutRepliesInput;
};

export type MemberCreateManyWithoutTeamInput = {
  create?: Maybe<Array<MemberCreateWithoutTeamInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutteamInput>>;
};

export enum UserType {
  Free = 'FREE',
  Pro = 'PRO'
}

export type MemberCreateManyWithoutUserInput = {
  create?: Maybe<Array<MemberCreateWithoutUserInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutuserInput>>;
};

export type CommentCreateManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutuserInput>>;
};

export type ProjectCreateManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutuserInput>>;
};

export type MemberCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<Role>;
  user: UserCreateOneWithoutMembersInput;
};

export type MemberCreateOrConnectWithoutteamInput = {
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

export type MemberCreateOrConnectWithoutuserInput = {
  where: MemberWhereUniqueInput;
  create: MemberCreateWithoutUserInput;
};

export type CommentCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  page: PageCreateOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateManyWithoutCommentInput>;
  comment?: Maybe<CommentCreateOneWithoutRepliesInput>;
};

export type CommentCreateOrConnectWithoutuserInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutUserInput;
};

export type ProjectCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectInput>;
  pages?: Maybe<PageCreateManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutuserInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutUserInput;
};

export type UserCreateOneWithoutMembersInput = {
  create?: Maybe<UserCreateWithoutMembersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutmembersInput>;
};

export type TeamCreateOneWithoutMembersInput = {
  create?: Maybe<TeamCreateWithoutMembersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutmembersInput>;
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

export type UserCreateOrConnectWithoutmembersInput = {
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

export type TeamCreateOrConnectWithoutmembersInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutMembersInput;
};

export type ProjectCreateManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutteamInput>>;
};

export type ProjectCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutteamInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutTeamInput;
};

export type CreateOneCommentMutationVariables = Exact<{
  pageId: Scalars['String'];
  content: Scalars['Json'];
  userId: Scalars['String'];
}>;


export type CreateOneCommentMutation = (
  { __typename?: 'Mutation' }
  & { createOneComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'createdAt'>
  ) }
);

export type GetAllCommentsByPageQueryVariables = Exact<{
  pageId: Scalars['String'];
}>;


export type GetAllCommentsByPageQuery = (
  { __typename?: 'Query' }
  & { getAllCommentsByPage?: Maybe<Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'name'>
    ), replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatar' | 'name'>
      ) }
    )> }
  )>>> }
);

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


export const CreateOneCommentDocument = gql`
    mutation createOneComment($pageId: String!, $content: Json!, $userId: String!) {
  createOneComment(
    data: {content: $content, page: {connect: {id: $pageId}}, user: {connect: {id: $userId}}}
  ) {
    id
    content
    createdAt
  }
}
    `;
export type CreateOneCommentMutationFn = Apollo.MutationFunction<CreateOneCommentMutation, CreateOneCommentMutationVariables>;

/**
 * __useCreateOneCommentMutation__
 *
 * To run a mutation, you first call `useCreateOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneCommentMutation, { data, loading, error }] = useCreateOneCommentMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      content: // value for 'content'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateOneCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneCommentMutation, CreateOneCommentMutationVariables>) {
        return Apollo.useMutation<CreateOneCommentMutation, CreateOneCommentMutationVariables>(CreateOneCommentDocument, baseOptions);
      }
export type CreateOneCommentMutationHookResult = ReturnType<typeof useCreateOneCommentMutation>;
export type CreateOneCommentMutationResult = Apollo.MutationResult<CreateOneCommentMutation>;
export type CreateOneCommentMutationOptions = Apollo.BaseMutationOptions<CreateOneCommentMutation, CreateOneCommentMutationVariables>;
export const GetAllCommentsByPageDocument = gql`
    query getAllCommentsByPage($pageId: String!) {
  getAllCommentsByPage(pageId: $pageId) {
    id
    content
    createdAt
    user {
      id
      avatar
      name
    }
    replies {
      id
      content
      createdAt
      user {
        id
        avatar
        name
      }
    }
  }
}
    `;

/**
 * __useGetAllCommentsByPageQuery__
 *
 * To run a query within a React component, call `useGetAllCommentsByPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommentsByPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommentsByPageQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetAllCommentsByPageQuery(baseOptions: Apollo.QueryHookOptions<GetAllCommentsByPageQuery, GetAllCommentsByPageQueryVariables>) {
        return Apollo.useQuery<GetAllCommentsByPageQuery, GetAllCommentsByPageQueryVariables>(GetAllCommentsByPageDocument, baseOptions);
      }
export function useGetAllCommentsByPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCommentsByPageQuery, GetAllCommentsByPageQueryVariables>) {
          return Apollo.useLazyQuery<GetAllCommentsByPageQuery, GetAllCommentsByPageQueryVariables>(GetAllCommentsByPageDocument, baseOptions);
        }
export type GetAllCommentsByPageQueryHookResult = ReturnType<typeof useGetAllCommentsByPageQuery>;
export type GetAllCommentsByPageLazyQueryHookResult = ReturnType<typeof useGetAllCommentsByPageLazyQuery>;
export type GetAllCommentsByPageQueryResult = Apollo.QueryResult<GetAllCommentsByPageQuery, GetAllCommentsByPageQueryVariables>;
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
export function usePageByProjectQuery(baseOptions: Apollo.QueryHookOptions<PageByProjectQuery, PageByProjectQueryVariables>) {
        return Apollo.useQuery<PageByProjectQuery, PageByProjectQueryVariables>(PageByProjectDocument, baseOptions);
      }
export function usePageByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageByProjectQuery, PageByProjectQueryVariables>) {
          return Apollo.useLazyQuery<PageByProjectQuery, PageByProjectQueryVariables>(PageByProjectDocument, baseOptions);
        }
export type PageByProjectQueryHookResult = ReturnType<typeof usePageByProjectQuery>;
export type PageByProjectLazyQueryHookResult = ReturnType<typeof usePageByProjectLazyQuery>;
export type PageByProjectQueryResult = Apollo.QueryResult<PageByProjectQuery, PageByProjectQueryVariables>;