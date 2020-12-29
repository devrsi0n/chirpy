import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  DateTime: any;
  Json: any;
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
  projects: Array<Project>;
  members: Array<Member>;
};


export type TeamProjectsArgs = {
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
  teamId?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
  userId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  pages: Array<Page>;
};


export type ProjectPagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<PageWhereUniqueInput>;
  after?: Maybe<PageWhereUniqueInput>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['String'];
  role: Role;
  userId: Scalars['String'];
  user: User;
  teamId: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  content: Scalars['Json'];
  pageId: Scalars['String'];
  page: Page;
  replies: Array<Comment>;
  userId: Scalars['String'];
  user: User;
  parentId?: Maybe<Scalars['String']>;
  parent?: Maybe<Comment>;
  likes: Array<Like>;
};


export type CommentRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CommentWhereUniqueInput>;
  after?: Maybe<CommentWhereUniqueInput>;
};


export type CommentLikesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<LikeWhereUniqueInput>;
  after?: Maybe<LikeWhereUniqueInput>;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  commentId: Scalars['String'];
  comment: Comment;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  page?: Maybe<Page>;
  project?: Maybe<Project>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  currentUser?: Maybe<User>;
  getOrCreatePage?: Maybe<Page>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};


export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type QueryCommentsArgs = {
  where?: Maybe<QueryCommentsWhereInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CommentWhereUniqueInput>;
  after?: Maybe<CommentWhereUniqueInput>;
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
  createOneLike: Like;
  deleteOneLike?: Maybe<Like>;
  updateOneComment?: Maybe<Comment>;
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


export type MutationCreateOneLikeArgs = {
  data: LikeCreateInput;
};


export type MutationDeleteOneLikeArgs = {
  where: LikeWhereUniqueInput;
};


export type MutationUpdateOneCommentArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};

export type MemberWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type ProjectWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type PageWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};



export type LikeWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleUserId?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['String']>;
};

export type QueryCommentsWhereInput = {
  id?: Maybe<StringFilter>;
  pageId?: Maybe<StringFilter>;
  parentId?: Maybe<StringNullableFilter>;
};

export type ProjectCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectsInput>;
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
  user: UserCreateOneWithoutCommentsInput;
  page: PageCreateOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
};

export type LikeCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutLikesInput;
  comment: CommentCreateOneWithoutLikesInput;
};

export type CommentUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
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

export type TeamCreateOneWithoutProjectsInput = {
  create?: Maybe<TeamCreateWithoutProjectsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutprojectsInput>;
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

export type UserCreateOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutcommentsInput>;
};

export type PageCreateOneWithoutCommentsInput = {
  create?: Maybe<PageCreateWithoutCommentsInput>;
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutcommentsInput>;
};

export type CommentCreateOneWithoutRepliesInput = {
  create?: Maybe<CommentCreateWithoutRepliesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutrepliesInput>;
};

export type CommentCreateManyWithoutReplyInput = {
  create?: Maybe<Array<CommentCreateWithoutReplyInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutreplyInput>>;
};

export type CommentCreateOneWithoutCommentInput = {
  create?: Maybe<CommentCreateWithoutCommentInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutCommentInput>;
};

export type LikeCreateManyWithoutCommentInput = {
  create?: Maybe<Array<LikeCreateWithoutCommentInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutcommentInput>>;
};

export type CommentCreateManyWithoutParentInput = {
  create?: Maybe<Array<CommentCreateWithoutParentInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutparentInput>>;
};

export type UserCreateOneWithoutLikesInput = {
  create?: Maybe<UserCreateWithoutLikesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutlikesInput>;
};

export type CommentCreateOneWithoutLikesInput = {
  create?: Maybe<CommentCreateWithoutLikesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutlikesInput>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutCommentsInput>;
  upsert?: Maybe<UserUpsertWithoutCommentsInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutcommentsInput>;
};

export type PageUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<PageCreateWithoutCommentsInput>;
  connect?: Maybe<PageWhereUniqueInput>;
  update?: Maybe<PageUpdateWithoutCommentsInput>;
  upsert?: Maybe<PageUpsertWithoutCommentsInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutcommentsInput>;
};

export type CommentUpdateOneWithoutRepliesInput = {
  create?: Maybe<CommentCreateWithoutRepliesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CommentUpdateWithoutRepliesInput>;
  upsert?: Maybe<CommentUpsertWithoutRepliesInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutrepliesInput>;
};

export type CommentUpdateManyWithoutReplyInput = {
  create?: Maybe<Array<CommentCreateWithoutReplyInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutReplyInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutReplyInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutReplyInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutreplyInput>>;
};

export type CommentUpdateOneWithoutCommentInput = {
  create?: Maybe<CommentCreateWithoutCommentInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CommentUpdateWithoutCommentInput>;
  upsert?: Maybe<CommentUpsertWithoutCommentInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutCommentInput>;
};

export type LikeUpdateManyWithoutCommentInput = {
  create?: Maybe<Array<LikeCreateWithoutCommentInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
  set?: Maybe<Array<LikeWhereUniqueInput>>;
  disconnect?: Maybe<Array<LikeWhereUniqueInput>>;
  delete?: Maybe<Array<LikeWhereUniqueInput>>;
  update?: Maybe<Array<LikeUpdateWithWhereUniqueWithoutCommentInput>>;
  updateMany?: Maybe<Array<LikeUpdateManyWithWhereWithoutCommentInput>>;
  deleteMany?: Maybe<Array<LikeScalarWhereInput>>;
  upsert?: Maybe<Array<LikeUpsertWithWhereUniqueWithoutCommentInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutcommentInput>>;
};

export type CommentUpdateManyWithoutParentInput = {
  create?: Maybe<Array<CommentCreateWithoutParentInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutParentInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutParentInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutParentInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutparentInput>>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
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

export type TeamCreateWithoutProjectsInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  members?: Maybe<MemberCreateManyWithoutTeamInput>;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type TeamCreateOrConnectWithoutprojectsInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutProjectsInput;
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
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
  likes?: Maybe<LikeCreateManyWithoutUserInput>;
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
  user: UserCreateOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
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
  team?: Maybe<TeamCreateOneWithoutProjectsInput>;
  user?: Maybe<UserCreateOneWithoutProjectsInput>;
};

export type ProjectCreateOrConnectWithoutpagesInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutPagesInput;
};

export type UserCreateWithoutCommentsInput = {
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
  likes?: Maybe<LikeCreateManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutcommentsInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutCommentsInput;
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

export type CommentCreateWithoutRepliesInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentsInput;
  page: PageCreateOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutrepliesInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutRepliesInput;
};

export type CommentCreateWithoutReplyInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentsInput;
  page: PageCreateOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutreplyInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutReplyInput;
};

export type CommentCreateWithoutCommentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentsInput;
  page: PageCreateOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
};

export type CommentCreateOrConnectWithoutCommentInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutCommentInput;
};

export type LikeCreateWithoutCommentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutLikesInput;
};

export type LikeCreateOrConnectWithoutcommentInput = {
  where: LikeWhereUniqueInput;
  create: LikeCreateWithoutCommentInput;
};

export type CommentCreateWithoutParentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentsInput;
  page: PageCreateOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutparentInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutParentInput;
};

export type UserCreateWithoutLikesInput = {
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
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutlikesInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutLikesInput;
};

export type CommentCreateWithoutLikesInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateOneWithoutCommentsInput;
  page: PageCreateOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutlikesInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutLikesInput;
};

export type UserUpdateWithoutCommentsInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  googleUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  githubUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: Maybe<NullableStringFieldUpdateOperationsInput>;
  type?: Maybe<EnumUserTypeFieldUpdateOperationsInput>;
  members?: Maybe<MemberUpdateManyWithoutUserInput>;
  projects?: Maybe<ProjectUpdateManyWithoutUserInput>;
  likes?: Maybe<LikeUpdateManyWithoutUserInput>;
};

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsInput;
  create: UserCreateWithoutCommentsInput;
};

export type PageUpdateWithoutCommentsInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  url?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  project?: Maybe<ProjectUpdateOneRequiredWithoutPagesInput>;
};

export type PageUpsertWithoutCommentsInput = {
  update: PageUpdateWithoutCommentsInput;
  create: PageCreateWithoutCommentsInput;
};

export type CommentUpdateWithoutRepliesInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
};

export type CommentUpsertWithoutRepliesInput = {
  update: CommentUpdateWithoutRepliesInput;
  create: CommentCreateWithoutRepliesInput;
};

export type CommentUpdateWithWhereUniqueWithoutReplyInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutReplyInput;
};

export type CommentUpdateManyWithWhereWithoutReplyInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type CommentScalarWhereInput = {
  AND?: Maybe<Array<CommentScalarWhereInput>>;
  OR?: Maybe<Array<CommentScalarWhereInput>>;
  NOT?: Maybe<Array<CommentScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
  pageId?: Maybe<StringFilter>;
  replyId?: Maybe<StringNullableFilter>;
  parentId?: Maybe<StringNullableFilter>;
};

export type CommentUpsertWithWhereUniqueWithoutReplyInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutReplyInput;
  create: CommentCreateWithoutReplyInput;
};

export type CommentUpdateWithoutCommentInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
};

export type CommentUpsertWithoutCommentInput = {
  update: CommentUpdateWithoutCommentInput;
  create: CommentCreateWithoutCommentInput;
};

export type LikeUpdateWithWhereUniqueWithoutCommentInput = {
  where: LikeWhereUniqueInput;
  data: LikeUpdateWithoutCommentInput;
};

export type LikeUpdateManyWithWhereWithoutCommentInput = {
  where: LikeScalarWhereInput;
  data: LikeUpdateManyMutationInput;
};

export type LikeScalarWhereInput = {
  AND?: Maybe<Array<LikeScalarWhereInput>>;
  OR?: Maybe<Array<LikeScalarWhereInput>>;
  NOT?: Maybe<Array<LikeScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
  commentId?: Maybe<StringFilter>;
};

export type LikeUpsertWithWhereUniqueWithoutCommentInput = {
  where: LikeWhereUniqueInput;
  update: LikeUpdateWithoutCommentInput;
  create: LikeCreateWithoutCommentInput;
};

export type CommentUpdateWithWhereUniqueWithoutParentInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutParentInput;
};

export type CommentUpdateManyWithWhereWithoutParentInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type CommentUpsertWithWhereUniqueWithoutParentInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutParentInput;
  create: CommentCreateWithoutParentInput;
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

export type LikeCreateManyWithoutUserInput = {
  create?: Maybe<Array<LikeCreateWithoutUserInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutuserInput>>;
};

export type ProjectCreateManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutuserInput>>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type EnumUserTypeFieldUpdateOperationsInput = {
  set?: Maybe<UserType>;
};

export type MemberUpdateManyWithoutUserInput = {
  create?: Maybe<Array<MemberCreateWithoutUserInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  set?: Maybe<Array<MemberWhereUniqueInput>>;
  disconnect?: Maybe<Array<MemberWhereUniqueInput>>;
  delete?: Maybe<Array<MemberWhereUniqueInput>>;
  update?: Maybe<Array<MemberUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<MemberUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<MemberScalarWhereInput>>;
  upsert?: Maybe<Array<MemberUpsertWithWhereUniqueWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutuserInput>>;
};

export type ProjectUpdateManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  set?: Maybe<Array<ProjectWhereUniqueInput>>;
  disconnect?: Maybe<Array<ProjectWhereUniqueInput>>;
  delete?: Maybe<Array<ProjectWhereUniqueInput>>;
  update?: Maybe<Array<ProjectUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<ProjectUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<ProjectScalarWhereInput>>;
  upsert?: Maybe<Array<ProjectUpsertWithWhereUniqueWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutuserInput>>;
};

export type LikeUpdateManyWithoutUserInput = {
  create?: Maybe<Array<LikeCreateWithoutUserInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
  set?: Maybe<Array<LikeWhereUniqueInput>>;
  disconnect?: Maybe<Array<LikeWhereUniqueInput>>;
  delete?: Maybe<Array<LikeWhereUniqueInput>>;
  update?: Maybe<Array<LikeUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<LikeUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<LikeScalarWhereInput>>;
  upsert?: Maybe<Array<LikeUpsertWithWhereUniqueWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutuserInput>>;
};

export type ProjectUpdateOneRequiredWithoutPagesInput = {
  create?: Maybe<ProjectCreateWithoutPagesInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
  update?: Maybe<ProjectUpdateWithoutPagesInput>;
  upsert?: Maybe<ProjectUpsertWithoutPagesInput>;
  connectOrCreate?: Maybe<ProjectCreateOrConnectWithoutpagesInput>;
};

export type CommentUpdateWithoutReplyInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
};

export type CommentUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
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

export type LikeUpdateWithoutCommentInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutLikesInput>;
};

export type LikeUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutParentInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
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
  reply?: Maybe<CommentCreateOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutuserInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutUserInput;
};

export type LikeCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  comment: CommentCreateOneWithoutLikesInput;
};

export type LikeCreateOrConnectWithoutuserInput = {
  where: LikeWhereUniqueInput;
  create: LikeCreateWithoutUserInput;
};

export type ProjectCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team?: Maybe<TeamCreateOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutuserInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutUserInput;
};

export type MemberUpdateWithWhereUniqueWithoutUserInput = {
  where: MemberWhereUniqueInput;
  data: MemberUpdateWithoutUserInput;
};

export type MemberUpdateManyWithWhereWithoutUserInput = {
  where: MemberScalarWhereInput;
  data: MemberUpdateManyMutationInput;
};

export type MemberScalarWhereInput = {
  AND?: Maybe<Array<MemberScalarWhereInput>>;
  OR?: Maybe<Array<MemberScalarWhereInput>>;
  NOT?: Maybe<Array<MemberScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
  teamId?: Maybe<StringFilter>;
  role?: Maybe<EnumRoleFilter>;
};

export type MemberUpsertWithWhereUniqueWithoutUserInput = {
  where: MemberWhereUniqueInput;
  update: MemberUpdateWithoutUserInput;
  create: MemberCreateWithoutUserInput;
};

export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateWithoutUserInput;
};

export type ProjectUpdateManyWithWhereWithoutUserInput = {
  where: ProjectScalarWhereInput;
  data: ProjectUpdateManyMutationInput;
};

export type ProjectScalarWhereInput = {
  AND?: Maybe<Array<ProjectScalarWhereInput>>;
  OR?: Maybe<Array<ProjectScalarWhereInput>>;
  NOT?: Maybe<Array<ProjectScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringFilter>;
  teamId?: Maybe<StringNullableFilter>;
  userId?: Maybe<StringNullableFilter>;
};

export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
  where: ProjectWhereUniqueInput;
  update: ProjectUpdateWithoutUserInput;
  create: ProjectCreateWithoutUserInput;
};

export type LikeUpdateWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput;
  data: LikeUpdateWithoutUserInput;
};

export type LikeUpdateManyWithWhereWithoutUserInput = {
  where: LikeScalarWhereInput;
  data: LikeUpdateManyMutationInput;
};

export type LikeUpsertWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput;
  update: LikeUpdateWithoutUserInput;
  create: LikeCreateWithoutUserInput;
};

export type ProjectUpdateWithoutPagesInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutProjectsInput>;
  user?: Maybe<UserUpdateOneWithoutProjectsInput>;
};

export type ProjectUpsertWithoutPagesInput = {
  update: ProjectUpdateWithoutPagesInput;
  create: ProjectCreateWithoutPagesInput;
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

export type UserUpdateOneRequiredWithoutLikesInput = {
  create?: Maybe<UserCreateWithoutLikesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutLikesInput>;
  upsert?: Maybe<UserUpsertWithoutLikesInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutlikesInput>;
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

export type MemberUpdateWithoutUserInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutMembersInput>;
};

export type MemberUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
};

export type EnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  notIn?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
};

export type ProjectUpdateWithoutUserInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutProjectsInput>;
  pages?: Maybe<PageUpdateManyWithoutProjectInput>;
};

export type ProjectUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
};

export type LikeUpdateWithoutUserInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  comment?: Maybe<CommentUpdateOneRequiredWithoutLikesInput>;
};

export type TeamUpdateOneWithoutProjectsInput = {
  create?: Maybe<TeamCreateWithoutProjectsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutProjectsInput>;
  upsert?: Maybe<TeamUpsertWithoutProjectsInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutprojectsInput>;
};

export type UserUpdateOneWithoutProjectsInput = {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutProjectsInput>;
  upsert?: Maybe<UserUpsertWithoutProjectsInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutprojectsInput>;
};

export type UserUpdateWithoutLikesInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  googleUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  githubUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: Maybe<NullableStringFieldUpdateOperationsInput>;
  type?: Maybe<EnumUserTypeFieldUpdateOperationsInput>;
  members?: Maybe<MemberUpdateManyWithoutUserInput>;
  projects?: Maybe<ProjectUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
};

export type UserUpsertWithoutLikesInput = {
  update: UserUpdateWithoutLikesInput;
  create: UserCreateWithoutLikesInput;
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
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
  likes?: Maybe<LikeCreateManyWithoutUserInput>;
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
  projects?: Maybe<ProjectCreateManyWithoutTeamInput>;
};

export type TeamCreateOrConnectWithoutmembersInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutMembersInput;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Maybe<Role>;
};

export type TeamUpdateOneRequiredWithoutMembersInput = {
  create?: Maybe<TeamCreateWithoutMembersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  update?: Maybe<TeamUpdateWithoutMembersInput>;
  upsert?: Maybe<TeamUpsertWithoutMembersInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutmembersInput>;
};

export type NestedEnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  notIn?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
};

export type PageUpdateManyWithoutProjectInput = {
  create?: Maybe<Array<PageCreateWithoutProjectInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  set?: Maybe<Array<PageWhereUniqueInput>>;
  disconnect?: Maybe<Array<PageWhereUniqueInput>>;
  delete?: Maybe<Array<PageWhereUniqueInput>>;
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutProjectInput>>;
  updateMany?: Maybe<Array<PageUpdateManyWithWhereWithoutProjectInput>>;
  deleteMany?: Maybe<Array<PageScalarWhereInput>>;
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutProjectInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutprojectInput>>;
};

export type CommentUpdateOneRequiredWithoutLikesInput = {
  create?: Maybe<CommentCreateWithoutLikesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  update?: Maybe<CommentUpdateWithoutLikesInput>;
  upsert?: Maybe<CommentUpsertWithoutLikesInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutlikesInput>;
};

export type TeamUpdateWithoutProjectsInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<MemberUpdateManyWithoutTeamInput>;
};

export type TeamUpsertWithoutProjectsInput = {
  update: TeamUpdateWithoutProjectsInput;
  create: TeamCreateWithoutProjectsInput;
};

export type UserUpdateWithoutProjectsInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  googleUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  githubUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: Maybe<NullableStringFieldUpdateOperationsInput>;
  type?: Maybe<EnumUserTypeFieldUpdateOperationsInput>;
  members?: Maybe<MemberUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
  likes?: Maybe<LikeUpdateManyWithoutUserInput>;
};

export type UserUpsertWithoutProjectsInput = {
  update: UserUpdateWithoutProjectsInput;
  create: UserCreateWithoutProjectsInput;
};

export type CommentUpdateManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutuserInput>>;
};

export type ProjectCreateManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutteamInput>>;
};

export type TeamUpdateWithoutMembersInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  projects?: Maybe<ProjectUpdateManyWithoutTeamInput>;
};

export type TeamUpsertWithoutMembersInput = {
  update: TeamUpdateWithoutMembersInput;
  create: TeamCreateWithoutMembersInput;
};

export type PageUpdateWithWhereUniqueWithoutProjectInput = {
  where: PageWhereUniqueInput;
  data: PageUpdateWithoutProjectInput;
};

export type PageUpdateManyWithWhereWithoutProjectInput = {
  where: PageScalarWhereInput;
  data: PageUpdateManyMutationInput;
};

export type PageScalarWhereInput = {
  AND?: Maybe<Array<PageScalarWhereInput>>;
  OR?: Maybe<Array<PageScalarWhereInput>>;
  NOT?: Maybe<Array<PageScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  url?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  projectId?: Maybe<StringFilter>;
};

export type PageUpsertWithWhereUniqueWithoutProjectInput = {
  where: PageWhereUniqueInput;
  update: PageUpdateWithoutProjectInput;
  create: PageCreateWithoutProjectInput;
};

export type CommentUpdateWithoutLikesInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
};

export type CommentUpsertWithoutLikesInput = {
  update: CommentUpdateWithoutLikesInput;
  create: CommentCreateWithoutLikesInput;
};

export type MemberUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<MemberCreateWithoutTeamInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  set?: Maybe<Array<MemberWhereUniqueInput>>;
  disconnect?: Maybe<Array<MemberWhereUniqueInput>>;
  delete?: Maybe<Array<MemberWhereUniqueInput>>;
  update?: Maybe<Array<MemberUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<MemberUpdateManyWithWhereWithoutTeamInput>>;
  deleteMany?: Maybe<Array<MemberScalarWhereInput>>;
  upsert?: Maybe<Array<MemberUpsertWithWhereUniqueWithoutTeamInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutteamInput>>;
};

export type CommentUpdateWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutUserInput;
};

export type CommentUpdateManyWithWhereWithoutUserInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type CommentUpsertWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutUserInput;
  create: CommentCreateWithoutUserInput;
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

export type ProjectUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  set?: Maybe<Array<ProjectWhereUniqueInput>>;
  disconnect?: Maybe<Array<ProjectWhereUniqueInput>>;
  delete?: Maybe<Array<ProjectWhereUniqueInput>>;
  update?: Maybe<Array<ProjectUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<ProjectUpdateManyWithWhereWithoutTeamInput>>;
  deleteMany?: Maybe<Array<ProjectScalarWhereInput>>;
  upsert?: Maybe<Array<ProjectUpsertWithWhereUniqueWithoutTeamInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutteamInput>>;
};

export type PageUpdateWithoutProjectInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  url?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  comments?: Maybe<CommentUpdateManyWithoutPageInput>;
};

export type PageUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  url?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type MemberUpdateWithWhereUniqueWithoutTeamInput = {
  where: MemberWhereUniqueInput;
  data: MemberUpdateWithoutTeamInput;
};

export type MemberUpdateManyWithWhereWithoutTeamInput = {
  where: MemberScalarWhereInput;
  data: MemberUpdateManyMutationInput;
};

export type MemberUpsertWithWhereUniqueWithoutTeamInput = {
  where: MemberWhereUniqueInput;
  update: MemberUpdateWithoutTeamInput;
  create: MemberCreateWithoutTeamInput;
};

export type CommentUpdateWithoutUserInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  page?: Maybe<PageUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
};

export type ProjectUpdateWithWhereUniqueWithoutTeamInput = {
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateWithoutTeamInput;
};

export type ProjectUpdateManyWithWhereWithoutTeamInput = {
  where: ProjectScalarWhereInput;
  data: ProjectUpdateManyMutationInput;
};

export type ProjectUpsertWithWhereUniqueWithoutTeamInput = {
  where: ProjectWhereUniqueInput;
  update: ProjectUpdateWithoutTeamInput;
  create: ProjectCreateWithoutTeamInput;
};

export type CommentUpdateManyWithoutPageInput = {
  create?: Maybe<Array<CommentCreateWithoutPageInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutPageInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutPageInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutPageInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutpageInput>>;
};

export type MemberUpdateWithoutTeamInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutMembersInput>;
};

export type ProjectUpdateWithoutTeamInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneWithoutProjectsInput>;
  pages?: Maybe<PageUpdateManyWithoutProjectInput>;
};

export type CommentUpdateWithWhereUniqueWithoutPageInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutPageInput;
};

export type CommentUpdateManyWithWhereWithoutPageInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type CommentUpsertWithWhereUniqueWithoutPageInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutPageInput;
  create: CommentCreateWithoutPageInput;
};

export type UserUpdateOneRequiredWithoutMembersInput = {
  create?: Maybe<UserCreateWithoutMembersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutMembersInput>;
  upsert?: Maybe<UserUpsertWithoutMembersInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutmembersInput>;
};

export type CommentUpdateWithoutPageInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  content?: Maybe<Scalars['Json']>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  reply?: Maybe<CommentUpdateOneWithoutRepliesInput>;
  replies?: Maybe<CommentUpdateManyWithoutReplyInput>;
  parent?: Maybe<CommentUpdateOneWithoutCommentInput>;
  likes?: Maybe<LikeUpdateManyWithoutCommentInput>;
  Comment?: Maybe<CommentUpdateManyWithoutParentInput>;
};

export type UserUpdateWithoutMembersInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  googleUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  githubUserId?: Maybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: Maybe<NullableStringFieldUpdateOperationsInput>;
  type?: Maybe<EnumUserTypeFieldUpdateOperationsInput>;
  projects?: Maybe<ProjectUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
  likes?: Maybe<LikeUpdateManyWithoutUserInput>;
};

export type UserUpsertWithoutMembersInput = {
  update: UserUpdateWithoutMembersInput;
  create: UserCreateWithoutMembersInput;
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
    & Pick<Comment, 'id' | 'pageId' | 'content' | 'parentId' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar'>
    ), likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id' | 'userId'>
    )> }
  ) }
);

export type CreateOneReplyMutationVariables = Exact<{
  id: Scalars['String'];
  content: Scalars['Json'];
  userId: Scalars['String'];
  pageId: Scalars['String'];
}>;


export type CreateOneReplyMutation = (
  { __typename?: 'Mutation' }
  & { updateOneComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'pageId' | 'content' | 'createdAt'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id' | 'userId'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar'>
    ), replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'pageId' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id' | 'userId'>
      )> }
    )> }
  )> }
);

export type CommentsByPageQueryVariables = Exact<{
  pageId: Scalars['String'];
}>;


export type CommentsByPageQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'pageId' | 'content' | 'parentId' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar'>
    ), likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id' | 'userId'>
    )>, replies: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'pageId' | 'parentId' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'avatar'>
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id' | 'userId'>
      )> }
    )> }
  )> }
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
        & { projects: Array<(
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

export type CreateOneLikeMutationVariables = Exact<{
  userId: Scalars['String'];
  commentId: Scalars['String'];
}>;


export type CreateOneLikeMutation = (
  { __typename?: 'Mutation' }
  & { createOneLike: (
    { __typename?: 'Like' }
    & Pick<Like, 'id'>
  ) }
);

export type DeleteOneLikeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteOneLikeMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneLike?: Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'id'>
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

export type ProjectAllCommentsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectAllCommentsQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
    & { pages: Array<(
      { __typename?: 'Page' }
      & Pick<Page, 'id'>
      & { comments: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'content'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name' | 'avatar'>
        ), replies: Array<(
          { __typename?: 'Comment' }
          & Pick<Comment, 'id' | 'content'>
          & { user: (
            { __typename?: 'User' }
            & Pick<User, 'id' | 'name' | 'avatar'>
          ) }
        )> }
      )> }
    )> }
  )> }
);


export const CreateOneCommentDocument = gql`
    mutation createOneComment($pageId: String!, $content: Json!, $userId: String!) {
  createOneComment(
    data: {content: $content, page: {connect: {id: $pageId}}, user: {connect: {id: $userId}}}
  ) {
    id
    pageId
    content
    parentId
    createdAt
    user {
      id
      name
      avatar
    }
    likes {
      id
      userId
    }
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
export const CreateOneReplyDocument = gql`
    mutation createOneReply($id: String!, $content: Json!, $userId: String!, $pageId: String!) {
  updateOneComment(
    where: {id: $id}
    data: {replies: {create: {content: $content, parent: {connect: {id: $id}}, user: {connect: {id: $userId}}, page: {connect: {id: $pageId}}}}}
  ) {
    id
    pageId
    content
    createdAt
    likes {
      id
      userId
    }
    user {
      id
      name
      avatar
    }
    replies {
      id
      pageId
      content
      createdAt
      user {
        id
        name
        avatar
      }
      likes {
        id
        userId
      }
    }
  }
}
    `;
export type CreateOneReplyMutationFn = Apollo.MutationFunction<CreateOneReplyMutation, CreateOneReplyMutationVariables>;

/**
 * __useCreateOneReplyMutation__
 *
 * To run a mutation, you first call `useCreateOneReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneReplyMutation, { data, loading, error }] = useCreateOneReplyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      userId: // value for 'userId'
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useCreateOneReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneReplyMutation, CreateOneReplyMutationVariables>) {
        return Apollo.useMutation<CreateOneReplyMutation, CreateOneReplyMutationVariables>(CreateOneReplyDocument, baseOptions);
      }
export type CreateOneReplyMutationHookResult = ReturnType<typeof useCreateOneReplyMutation>;
export type CreateOneReplyMutationResult = Apollo.MutationResult<CreateOneReplyMutation>;
export type CreateOneReplyMutationOptions = Apollo.BaseMutationOptions<CreateOneReplyMutation, CreateOneReplyMutationVariables>;
export const CommentsByPageDocument = gql`
    query commentsByPage($pageId: String!) {
  comments(where: {pageId: {equals: $pageId}, parentId: {equals: null}}) {
    id
    pageId
    content
    parentId
    createdAt
    user {
      id
      name
      avatar
    }
    likes {
      id
      userId
    }
    replies {
      id
      pageId
      parentId
      content
      createdAt
      user {
        id
        name
        avatar
      }
      likes {
        id
        userId
      }
    }
  }
}
    `;

/**
 * __useCommentsByPageQuery__
 *
 * To run a query within a React component, call `useCommentsByPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsByPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsByPageQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useCommentsByPageQuery(baseOptions: Apollo.QueryHookOptions<CommentsByPageQuery, CommentsByPageQueryVariables>) {
        return Apollo.useQuery<CommentsByPageQuery, CommentsByPageQueryVariables>(CommentsByPageDocument, baseOptions);
      }
export function useCommentsByPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsByPageQuery, CommentsByPageQueryVariables>) {
          return Apollo.useLazyQuery<CommentsByPageQuery, CommentsByPageQueryVariables>(CommentsByPageDocument, baseOptions);
        }
export type CommentsByPageQueryHookResult = ReturnType<typeof useCommentsByPageQuery>;
export type CommentsByPageLazyQueryHookResult = ReturnType<typeof useCommentsByPageLazyQuery>;
export type CommentsByPageQueryResult = Apollo.QueryResult<CommentsByPageQuery, CommentsByPageQueryVariables>;
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
        projects {
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
export const CreateOneLikeDocument = gql`
    mutation createOneLike($userId: String!, $commentId: String!) {
  createOneLike(
    data: {comment: {connect: {id: $commentId}}, user: {connect: {id: $userId}}}
  ) {
    id
  }
}
    `;
export type CreateOneLikeMutationFn = Apollo.MutationFunction<CreateOneLikeMutation, CreateOneLikeMutationVariables>;

/**
 * __useCreateOneLikeMutation__
 *
 * To run a mutation, you first call `useCreateOneLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneLikeMutation, { data, loading, error }] = useCreateOneLikeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCreateOneLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneLikeMutation, CreateOneLikeMutationVariables>) {
        return Apollo.useMutation<CreateOneLikeMutation, CreateOneLikeMutationVariables>(CreateOneLikeDocument, baseOptions);
      }
export type CreateOneLikeMutationHookResult = ReturnType<typeof useCreateOneLikeMutation>;
export type CreateOneLikeMutationResult = Apollo.MutationResult<CreateOneLikeMutation>;
export type CreateOneLikeMutationOptions = Apollo.BaseMutationOptions<CreateOneLikeMutation, CreateOneLikeMutationVariables>;
export const DeleteOneLikeDocument = gql`
    mutation deleteOneLike($id: String!) {
  deleteOneLike(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteOneLikeMutationFn = Apollo.MutationFunction<DeleteOneLikeMutation, DeleteOneLikeMutationVariables>;

/**
 * __useDeleteOneLikeMutation__
 *
 * To run a mutation, you first call `useDeleteOneLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneLikeMutation, { data, loading, error }] = useDeleteOneLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOneLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneLikeMutation, DeleteOneLikeMutationVariables>) {
        return Apollo.useMutation<DeleteOneLikeMutation, DeleteOneLikeMutationVariables>(DeleteOneLikeDocument, baseOptions);
      }
export type DeleteOneLikeMutationHookResult = ReturnType<typeof useDeleteOneLikeMutation>;
export type DeleteOneLikeMutationResult = Apollo.MutationResult<DeleteOneLikeMutation>;
export type DeleteOneLikeMutationOptions = Apollo.BaseMutationOptions<DeleteOneLikeMutation, DeleteOneLikeMutationVariables>;
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
export const ProjectAllCommentsDocument = gql`
    query projectAllComments($id: String!) {
  project(where: {id: $id}) {
    id
    pages {
      id
      comments {
        id
        content
        user {
          id
          name
          avatar
        }
        replies {
          id
          content
          user {
            id
            name
            avatar
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProjectAllCommentsQuery__
 *
 * To run a query within a React component, call `useProjectAllCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAllCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAllCommentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectAllCommentsQuery(baseOptions: Apollo.QueryHookOptions<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>) {
        return Apollo.useQuery<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>(ProjectAllCommentsDocument, baseOptions);
      }
export function useProjectAllCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>(ProjectAllCommentsDocument, baseOptions);
        }
export type ProjectAllCommentsQueryHookResult = ReturnType<typeof useProjectAllCommentsQuery>;
export type ProjectAllCommentsLazyQueryHookResult = ReturnType<typeof useProjectAllCommentsLazyQuery>;
export type ProjectAllCommentsQueryResult = Apollo.QueryResult<ProjectAllCommentsQuery, ProjectAllCommentsQueryVariables>;