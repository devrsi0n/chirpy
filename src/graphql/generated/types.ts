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
  Admin = 'ADMIN',
}

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type LikeWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  userId_commentId?: Maybe<LikeUserIdCommentIdCompoundUniqueInput>;
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
  team?: Maybe<TeamCreateNestedOneWithoutProjectsInput>;
  user?: Maybe<UserCreateNestedOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateNestedManyWithoutProjectInput>;
};

export type PageCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  title: Scalars['String'];
  comments?: Maybe<CommentCreateNestedManyWithoutPageInput>;
  project: ProjectCreateNestedOneWithoutPagesInput;
};

export type CommentCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['Json'];
  user: UserCreateNestedOneWithoutCommentsInput;
  page: PageCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
};

export type LikeCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutLikesInput;
  comment: CommentCreateNestedOneWithoutLikesInput;
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

export type LikeUserIdCommentIdCompoundUniqueInput = {
  userId: Scalars['String'];
  commentId: Scalars['String'];
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

export type TeamCreateNestedOneWithoutProjectsInput = {
  create?: Maybe<TeamCreateWithoutProjectsInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutprojectsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
};

export type UserCreateNestedOneWithoutProjectsInput = {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutprojectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type PageCreateNestedManyWithoutProjectInput = {
  create?: Maybe<Array<PageCreateWithoutProjectInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutprojectInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
};

export type CommentCreateNestedManyWithoutPageInput = {
  create?: Maybe<Array<CommentCreateWithoutPageInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutpageInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type ProjectCreateNestedOneWithoutPagesInput = {
  create?: Maybe<ProjectCreateWithoutPagesInput>;
  connectOrCreate?: Maybe<ProjectCreateOrConnectWithoutpagesInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
};

export type UserCreateNestedOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutcommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type PageCreateNestedOneWithoutCommentsInput = {
  create?: Maybe<PageCreateWithoutCommentsInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutcommentsInput>;
  connect?: Maybe<PageWhereUniqueInput>;
};

export type CommentCreateNestedOneWithoutRepliesInput = {
  create?: Maybe<CommentCreateWithoutRepliesInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutrepliesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
};

export type CommentCreateNestedManyWithoutReplyInput = {
  create?: Maybe<Array<CommentCreateWithoutReplyInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutreplyInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type CommentCreateNestedOneWithoutCommentInput = {
  create?: Maybe<CommentCreateWithoutCommentInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutCommentInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
};

export type LikeCreateNestedManyWithoutCommentInput = {
  create?: Maybe<Array<LikeCreateWithoutCommentInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutcommentInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
};

export type CommentCreateNestedManyWithoutParentInput = {
  create?: Maybe<Array<CommentCreateWithoutParentInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutparentInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type UserCreateNestedOneWithoutLikesInput = {
  create?: Maybe<UserCreateWithoutLikesInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutlikesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type CommentCreateNestedOneWithoutLikesInput = {
  create?: Maybe<CommentCreateWithoutLikesInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutlikesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutcommentsInput>;
  upsert?: Maybe<UserUpsertWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutCommentsInput>;
};

export type PageUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<PageCreateWithoutCommentsInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutcommentsInput>;
  upsert?: Maybe<PageUpsertWithoutCommentsInput>;
  connect?: Maybe<PageWhereUniqueInput>;
  update?: Maybe<PageUpdateWithoutCommentsInput>;
};

export type CommentUpdateOneWithoutRepliesInput = {
  create?: Maybe<CommentCreateWithoutRepliesInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutrepliesInput>;
  upsert?: Maybe<CommentUpsertWithoutRepliesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CommentUpdateWithoutRepliesInput>;
};

export type CommentUpdateManyWithoutReplyInput = {
  create?: Maybe<Array<CommentCreateWithoutReplyInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutreplyInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutReplyInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutReplyInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutReplyInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
};

export type CommentUpdateOneWithoutCommentInput = {
  create?: Maybe<CommentCreateWithoutCommentInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutCommentInput>;
  upsert?: Maybe<CommentUpsertWithoutCommentInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CommentUpdateWithoutCommentInput>;
};

export type LikeUpdateManyWithoutCommentInput = {
  create?: Maybe<Array<LikeCreateWithoutCommentInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutcommentInput>>;
  upsert?: Maybe<Array<LikeUpsertWithWhereUniqueWithoutCommentInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
  set?: Maybe<Array<LikeWhereUniqueInput>>;
  disconnect?: Maybe<Array<LikeWhereUniqueInput>>;
  delete?: Maybe<Array<LikeWhereUniqueInput>>;
  update?: Maybe<Array<LikeUpdateWithWhereUniqueWithoutCommentInput>>;
  updateMany?: Maybe<Array<LikeUpdateManyWithWhereWithoutCommentInput>>;
  deleteMany?: Maybe<Array<LikeScalarWhereInput>>;
};

export type CommentUpdateManyWithoutParentInput = {
  create?: Maybe<Array<CommentCreateWithoutParentInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutparentInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutParentInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutParentInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutParentInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
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
  members?: Maybe<MemberCreateNestedManyWithoutTeamInput>;
};

export type TeamCreateOrConnectWithoutprojectsInput = {
  where: TeamWhereUniqueInput;
  create: TeamCreateWithoutProjectsInput;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
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
  members?: Maybe<MemberCreateNestedManyWithoutUserInput>;
  comments?: Maybe<CommentCreateNestedManyWithoutUserInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutUserInput>;
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
  comments?: Maybe<CommentCreateNestedManyWithoutPageInput>;
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
  user: UserCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
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
  team?: Maybe<TeamCreateNestedOneWithoutProjectsInput>;
  user?: Maybe<UserCreateNestedOneWithoutProjectsInput>;
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
  members?: Maybe<MemberCreateNestedManyWithoutUserInput>;
  projects?: Maybe<ProjectCreateNestedManyWithoutUserInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutUserInput>;
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
  project: ProjectCreateNestedOneWithoutPagesInput;
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
  user: UserCreateNestedOneWithoutCommentsInput;
  page: PageCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
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
  user: UserCreateNestedOneWithoutCommentsInput;
  page: PageCreateNestedOneWithoutCommentsInput;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
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
  user: UserCreateNestedOneWithoutCommentsInput;
  page: PageCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
};

export type CommentCreateOrConnectWithoutCommentInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutCommentInput;
};

export type LikeCreateWithoutCommentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutLikesInput;
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
  user: UserCreateNestedOneWithoutCommentsInput;
  page: PageCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
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
  members?: Maybe<MemberCreateNestedManyWithoutUserInput>;
  projects?: Maybe<ProjectCreateNestedManyWithoutUserInput>;
  comments?: Maybe<CommentCreateNestedManyWithoutUserInput>;
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
  user: UserCreateNestedOneWithoutCommentsInput;
  page: PageCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutlikesInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutLikesInput;
};

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsInput;
  create: UserCreateWithoutCommentsInput;
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

export type PageUpsertWithoutCommentsInput = {
  update: PageUpdateWithoutCommentsInput;
  create: PageCreateWithoutCommentsInput;
};

export type PageUpdateWithoutCommentsInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  url?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  project?: Maybe<ProjectUpdateOneRequiredWithoutPagesInput>;
};

export type CommentUpsertWithoutRepliesInput = {
  update: CommentUpdateWithoutRepliesInput;
  create: CommentCreateWithoutRepliesInput;
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

export type CommentUpsertWithWhereUniqueWithoutReplyInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutReplyInput;
  create: CommentCreateWithoutReplyInput;
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

export type CommentUpsertWithoutCommentInput = {
  update: CommentUpdateWithoutCommentInput;
  create: CommentCreateWithoutCommentInput;
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

export type LikeUpsertWithWhereUniqueWithoutCommentInput = {
  where: LikeWhereUniqueInput;
  update: LikeUpdateWithoutCommentInput;
  create: LikeCreateWithoutCommentInput;
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

export type CommentUpsertWithWhereUniqueWithoutParentInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutParentInput;
  create: CommentCreateWithoutParentInput;
};

export type CommentUpdateWithWhereUniqueWithoutParentInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutParentInput;
};

export type CommentUpdateManyWithWhereWithoutParentInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type MemberCreateNestedManyWithoutTeamInput = {
  create?: Maybe<Array<MemberCreateWithoutTeamInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutteamInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
};

export enum UserType {
  Free = 'FREE',
  Pro = 'PRO',
}

export type MemberCreateNestedManyWithoutUserInput = {
  create?: Maybe<Array<MemberCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutuserInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
};

export type CommentCreateNestedManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutuserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type LikeCreateNestedManyWithoutUserInput = {
  create?: Maybe<Array<LikeCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutuserInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
};

export type ProjectCreateNestedManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutuserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type EnumUserTypeFieldUpdateOperationsInput = {
  set?: Maybe<UserType>;
};

export type MemberUpdateManyWithoutUserInput = {
  create?: Maybe<Array<MemberCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutuserInput>>;
  upsert?: Maybe<Array<MemberUpsertWithWhereUniqueWithoutUserInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  set?: Maybe<Array<MemberWhereUniqueInput>>;
  disconnect?: Maybe<Array<MemberWhereUniqueInput>>;
  delete?: Maybe<Array<MemberWhereUniqueInput>>;
  update?: Maybe<Array<MemberUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<MemberUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<MemberScalarWhereInput>>;
};

export type ProjectUpdateManyWithoutUserInput = {
  create?: Maybe<Array<ProjectCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutuserInput>>;
  upsert?: Maybe<Array<ProjectUpsertWithWhereUniqueWithoutUserInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  set?: Maybe<Array<ProjectWhereUniqueInput>>;
  disconnect?: Maybe<Array<ProjectWhereUniqueInput>>;
  delete?: Maybe<Array<ProjectWhereUniqueInput>>;
  update?: Maybe<Array<ProjectUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<ProjectUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<ProjectScalarWhereInput>>;
};

export type LikeUpdateManyWithoutUserInput = {
  create?: Maybe<Array<LikeCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<LikeCreateOrConnectWithoutuserInput>>;
  upsert?: Maybe<Array<LikeUpsertWithWhereUniqueWithoutUserInput>>;
  connect?: Maybe<Array<LikeWhereUniqueInput>>;
  set?: Maybe<Array<LikeWhereUniqueInput>>;
  disconnect?: Maybe<Array<LikeWhereUniqueInput>>;
  delete?: Maybe<Array<LikeWhereUniqueInput>>;
  update?: Maybe<Array<LikeUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<LikeUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<LikeScalarWhereInput>>;
};

export type ProjectUpdateOneRequiredWithoutPagesInput = {
  create?: Maybe<ProjectCreateWithoutPagesInput>;
  connectOrCreate?: Maybe<ProjectCreateOrConnectWithoutpagesInput>;
  upsert?: Maybe<ProjectUpsertWithoutPagesInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
  update?: Maybe<ProjectUpdateWithoutPagesInput>;
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
  user: UserCreateNestedOneWithoutMembersInput;
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
  team: TeamCreateNestedOneWithoutMembersInput;
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
  page: PageCreateNestedOneWithoutCommentsInput;
  reply?: Maybe<CommentCreateNestedOneWithoutRepliesInput>;
  replies?: Maybe<CommentCreateNestedManyWithoutReplyInput>;
  parent?: Maybe<CommentCreateNestedOneWithoutCommentInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutCommentInput>;
  Comment?: Maybe<CommentCreateNestedManyWithoutParentInput>;
};

export type CommentCreateOrConnectWithoutuserInput = {
  where: CommentWhereUniqueInput;
  create: CommentCreateWithoutUserInput;
};

export type LikeCreateWithoutUserInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  comment: CommentCreateNestedOneWithoutLikesInput;
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
  team?: Maybe<TeamCreateNestedOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateNestedManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutuserInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutUserInput;
};

export type MemberUpsertWithWhereUniqueWithoutUserInput = {
  where: MemberWhereUniqueInput;
  update: MemberUpdateWithoutUserInput;
  create: MemberCreateWithoutUserInput;
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

export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
  where: ProjectWhereUniqueInput;
  update: ProjectUpdateWithoutUserInput;
  create: ProjectCreateWithoutUserInput;
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

export type LikeUpsertWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput;
  update: LikeUpdateWithoutUserInput;
  create: LikeCreateWithoutUserInput;
};

export type LikeUpdateWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput;
  data: LikeUpdateWithoutUserInput;
};

export type LikeUpdateManyWithWhereWithoutUserInput = {
  where: LikeScalarWhereInput;
  data: LikeUpdateManyMutationInput;
};

export type ProjectUpsertWithoutPagesInput = {
  update: ProjectUpdateWithoutPagesInput;
  create: ProjectCreateWithoutPagesInput;
};

export type ProjectUpdateWithoutPagesInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutProjectsInput>;
  user?: Maybe<UserUpdateOneWithoutProjectsInput>;
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
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutlikesInput>;
  upsert?: Maybe<UserUpsertWithoutLikesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutLikesInput>;
};

export type UserCreateNestedOneWithoutMembersInput = {
  create?: Maybe<UserCreateWithoutMembersInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutmembersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type TeamCreateNestedOneWithoutMembersInput = {
  create?: Maybe<TeamCreateWithoutMembersInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutmembersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
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
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutprojectsInput>;
  upsert?: Maybe<TeamUpsertWithoutProjectsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutProjectsInput>;
};

export type UserUpdateOneWithoutProjectsInput = {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutprojectsInput>;
  upsert?: Maybe<UserUpsertWithoutProjectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutProjectsInput>;
};

export type UserUpsertWithoutLikesInput = {
  update: UserUpdateWithoutLikesInput;
  create: UserCreateWithoutLikesInput;
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
  projects?: Maybe<ProjectCreateNestedManyWithoutUserInput>;
  comments?: Maybe<CommentCreateNestedManyWithoutUserInput>;
  likes?: Maybe<LikeCreateNestedManyWithoutUserInput>;
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
  projects?: Maybe<ProjectCreateNestedManyWithoutTeamInput>;
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
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutmembersInput>;
  upsert?: Maybe<TeamUpsertWithoutMembersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  update?: Maybe<TeamUpdateWithoutMembersInput>;
};

export type NestedEnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  notIn?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
};

export type PageUpdateManyWithoutProjectInput = {
  create?: Maybe<Array<PageCreateWithoutProjectInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutprojectInput>>;
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutProjectInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  set?: Maybe<Array<PageWhereUniqueInput>>;
  disconnect?: Maybe<Array<PageWhereUniqueInput>>;
  delete?: Maybe<Array<PageWhereUniqueInput>>;
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutProjectInput>>;
  updateMany?: Maybe<Array<PageUpdateManyWithWhereWithoutProjectInput>>;
  deleteMany?: Maybe<Array<PageScalarWhereInput>>;
};

export type CommentUpdateOneRequiredWithoutLikesInput = {
  create?: Maybe<CommentCreateWithoutLikesInput>;
  connectOrCreate?: Maybe<CommentCreateOrConnectWithoutlikesInput>;
  upsert?: Maybe<CommentUpsertWithoutLikesInput>;
  connect?: Maybe<CommentWhereUniqueInput>;
  update?: Maybe<CommentUpdateWithoutLikesInput>;
};

export type TeamUpsertWithoutProjectsInput = {
  update: TeamUpdateWithoutProjectsInput;
  create: TeamCreateWithoutProjectsInput;
};

export type TeamUpdateWithoutProjectsInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<MemberUpdateManyWithoutTeamInput>;
};

export type UserUpsertWithoutProjectsInput = {
  update: UserUpdateWithoutProjectsInput;
  create: UserCreateWithoutProjectsInput;
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

export type CommentUpdateManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutuserInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutUserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
};

export type ProjectCreateNestedManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutteamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
};

export type TeamUpsertWithoutMembersInput = {
  update: TeamUpdateWithoutMembersInput;
  create: TeamCreateWithoutMembersInput;
};

export type TeamUpdateWithoutMembersInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  projects?: Maybe<ProjectUpdateManyWithoutTeamInput>;
};

export type PageUpsertWithWhereUniqueWithoutProjectInput = {
  where: PageWhereUniqueInput;
  update: PageUpdateWithoutProjectInput;
  create: PageCreateWithoutProjectInput;
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

export type CommentUpsertWithoutLikesInput = {
  update: CommentUpdateWithoutLikesInput;
  create: CommentCreateWithoutLikesInput;
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

export type MemberUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<MemberCreateWithoutTeamInput>>;
  connectOrCreate?: Maybe<Array<MemberCreateOrConnectWithoutteamInput>>;
  upsert?: Maybe<Array<MemberUpsertWithWhereUniqueWithoutTeamInput>>;
  connect?: Maybe<Array<MemberWhereUniqueInput>>;
  set?: Maybe<Array<MemberWhereUniqueInput>>;
  disconnect?: Maybe<Array<MemberWhereUniqueInput>>;
  delete?: Maybe<Array<MemberWhereUniqueInput>>;
  update?: Maybe<Array<MemberUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<MemberUpdateManyWithWhereWithoutTeamInput>>;
  deleteMany?: Maybe<Array<MemberScalarWhereInput>>;
};

export type CommentUpsertWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutUserInput;
  create: CommentCreateWithoutUserInput;
};

export type CommentUpdateWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutUserInput;
};

export type CommentUpdateManyWithWhereWithoutUserInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type ProjectCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  user?: Maybe<UserCreateNestedOneWithoutProjectsInput>;
  pages?: Maybe<PageCreateNestedManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutteamInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutTeamInput;
};

export type ProjectUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<ProjectCreateWithoutTeamInput>>;
  connectOrCreate?: Maybe<Array<ProjectCreateOrConnectWithoutteamInput>>;
  upsert?: Maybe<Array<ProjectUpsertWithWhereUniqueWithoutTeamInput>>;
  connect?: Maybe<Array<ProjectWhereUniqueInput>>;
  set?: Maybe<Array<ProjectWhereUniqueInput>>;
  disconnect?: Maybe<Array<ProjectWhereUniqueInput>>;
  delete?: Maybe<Array<ProjectWhereUniqueInput>>;
  update?: Maybe<Array<ProjectUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<ProjectUpdateManyWithWhereWithoutTeamInput>>;
  deleteMany?: Maybe<Array<ProjectScalarWhereInput>>;
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

export type MemberUpsertWithWhereUniqueWithoutTeamInput = {
  where: MemberWhereUniqueInput;
  update: MemberUpdateWithoutTeamInput;
  create: MemberCreateWithoutTeamInput;
};

export type MemberUpdateWithWhereUniqueWithoutTeamInput = {
  where: MemberWhereUniqueInput;
  data: MemberUpdateWithoutTeamInput;
};

export type MemberUpdateManyWithWhereWithoutTeamInput = {
  where: MemberScalarWhereInput;
  data: MemberUpdateManyMutationInput;
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

export type ProjectUpsertWithWhereUniqueWithoutTeamInput = {
  where: ProjectWhereUniqueInput;
  update: ProjectUpdateWithoutTeamInput;
  create: ProjectCreateWithoutTeamInput;
};

export type ProjectUpdateWithWhereUniqueWithoutTeamInput = {
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateWithoutTeamInput;
};

export type ProjectUpdateManyWithWhereWithoutTeamInput = {
  where: ProjectScalarWhereInput;
  data: ProjectUpdateManyMutationInput;
};

export type CommentUpdateManyWithoutPageInput = {
  create?: Maybe<Array<CommentCreateWithoutPageInput>>;
  connectOrCreate?: Maybe<Array<CommentCreateOrConnectWithoutpageInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutPageInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutPageInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereWithoutPageInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
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

export type CommentUpsertWithWhereUniqueWithoutPageInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutPageInput;
  create: CommentCreateWithoutPageInput;
};

export type CommentUpdateWithWhereUniqueWithoutPageInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutPageInput;
};

export type CommentUpdateManyWithWhereWithoutPageInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyMutationInput;
};

export type UserUpdateOneRequiredWithoutMembersInput = {
  create?: Maybe<UserCreateWithoutMembersInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutmembersInput>;
  upsert?: Maybe<UserUpsertWithoutMembersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutMembersInput>;
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

export type UserUpsertWithoutMembersInput = {
  update: UserUpdateWithoutMembersInput;
  create: UserCreateWithoutMembersInput;
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
