export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  jsonb: any;
  timestamptz: string;
  uuid: string;
};

/** columns and relationships of "Account" */
export type Account = {
  __typename?: 'Account';
  accessToken?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  idToken?: Maybe<Scalars['String']>;
  oauthToken?: Maybe<Scalars['String']>;
  oauthTokenSecret?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  sessionState?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
};

/** aggregated selection of "Account" */
export type Account_Aggregate = {
  __typename?: 'Account_aggregate';
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

/** aggregate fields of "Account" */
export type Account_Aggregate_Fields = {
  __typename?: 'Account_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
};


/** aggregate fields of "Account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Account" */
export type Account_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Account_Max_Order_By>;
  min?: InputMaybe<Account_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Account" */
export type Account_Arr_Rel_Insert_Input = {
  data: Array<Account_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Account_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  accessToken?: InputMaybe<String_Comparison_Exp>;
  expiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  idToken?: InputMaybe<String_Comparison_Exp>;
  oauthToken?: InputMaybe<String_Comparison_Exp>;
  oauthTokenSecret?: InputMaybe<String_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  providerAccountId?: InputMaybe<String_Comparison_Exp>;
  refreshToken?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<String_Comparison_Exp>;
  sessionState?: InputMaybe<String_Comparison_Exp>;
  tokenType?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Account" */
export enum Account_Constraint {
  /** unique or primary key constraint */
  AccountPkey = 'Account_pkey',
  /** unique or primary key constraint */
  AccountProviderAccountIdProviderKey = 'Account_providerAccountId_provider_key'
}

/** input type for inserting data into table "Account" */
export type Account_Insert_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  idToken?: InputMaybe<Scalars['String']>;
  oauthToken?: InputMaybe<Scalars['String']>;
  oauthTokenSecret?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  providerAccountId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  sessionState?: InputMaybe<Scalars['String']>;
  tokenType?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'Account_max_fields';
  accessToken?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  idToken?: Maybe<Scalars['String']>;
  oauthToken?: Maybe<Scalars['String']>;
  oauthTokenSecret?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  providerAccountId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  sessionState?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Account" */
export type Account_Max_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  idToken?: InputMaybe<Order_By>;
  oauthToken?: InputMaybe<Order_By>;
  oauthTokenSecret?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  providerAccountId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sessionState?: InputMaybe<Order_By>;
  tokenType?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'Account_min_fields';
  accessToken?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  idToken?: Maybe<Scalars['String']>;
  oauthToken?: Maybe<Scalars['String']>;
  oauthTokenSecret?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  providerAccountId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  sessionState?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Account" */
export type Account_Min_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  idToken?: InputMaybe<Order_By>;
  oauthToken?: InputMaybe<Order_By>;
  oauthTokenSecret?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  providerAccountId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sessionState?: InputMaybe<Order_By>;
  tokenType?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Account" */
export type Account_Mutation_Response = {
  __typename?: 'Account_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Account>;
};

/** on conflict condition type for table "Account" */
export type Account_On_Conflict = {
  constraint: Account_Constraint;
  update_columns?: Array<Account_Update_Column>;
  where?: InputMaybe<Account_Bool_Exp>;
};

/** Ordering options when selecting data from "Account". */
export type Account_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  idToken?: InputMaybe<Order_By>;
  oauthToken?: InputMaybe<Order_By>;
  oauthTokenSecret?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  providerAccountId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sessionState?: InputMaybe<Order_By>;
  tokenType?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Account */
export type Account_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Account" */
export enum Account_Select_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  IdToken = 'idToken',
  /** column name */
  OauthToken = 'oauthToken',
  /** column name */
  OauthTokenSecret = 'oauthTokenSecret',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderAccountId = 'providerAccountId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  Scope = 'scope',
  /** column name */
  SessionState = 'sessionState',
  /** column name */
  TokenType = 'tokenType',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Account" */
export type Account_Set_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  idToken?: InputMaybe<Scalars['String']>;
  oauthToken?: InputMaybe<Scalars['String']>;
  oauthTokenSecret?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  providerAccountId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  sessionState?: InputMaybe<Scalars['String']>;
  tokenType?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Account" */
export enum Account_Update_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  IdToken = 'idToken',
  /** column name */
  OauthToken = 'oauthToken',
  /** column name */
  OauthTokenSecret = 'oauthTokenSecret',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderAccountId = 'providerAccountId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  Scope = 'scope',
  /** column name */
  SessionState = 'sessionState',
  /** column name */
  TokenType = 'tokenType',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "Comment" */
export type Comment = {
  __typename?: 'Comment';
  content: Scalars['jsonb'];
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An array relationship */
  likes: Array<Like>;
  /** An aggregate relationship */
  likes_aggregate: Like_Aggregate;
  /** An object relationship */
  page: Page;
  pageId: Scalars['uuid'];
  /** An object relationship */
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  replies: Array<Comment>;
  /** An aggregate relationship */
  replies_aggregate: Comment_Aggregate;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
};


/** columns and relationships of "Comment" */
export type CommentContentArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Comment" */
export type CommentLikesArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


/** columns and relationships of "Comment" */
export type CommentLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


/** columns and relationships of "Comment" */
export type CommentRepliesArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


/** columns and relationships of "Comment" */
export type CommentReplies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};

/** aggregated selection of "Comment" */
export type Comment_Aggregate = {
  __typename?: 'Comment_aggregate';
  aggregate?: Maybe<Comment_Aggregate_Fields>;
  nodes: Array<Comment>;
};

/** aggregate fields of "Comment" */
export type Comment_Aggregate_Fields = {
  __typename?: 'Comment_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Comment_Max_Fields>;
  min?: Maybe<Comment_Min_Fields>;
};


/** aggregate fields of "Comment" */
export type Comment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Comment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Comment" */
export type Comment_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Comment_Max_Order_By>;
  min?: InputMaybe<Comment_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Comment_Append_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Comment" */
export type Comment_Arr_Rel_Insert_Input = {
  data: Array<Comment_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Comment_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Comment". All fields are combined with a logical 'AND'. */
export type Comment_Bool_Exp = {
  _and?: InputMaybe<Array<Comment_Bool_Exp>>;
  _not?: InputMaybe<Comment_Bool_Exp>;
  _or?: InputMaybe<Array<Comment_Bool_Exp>>;
  content?: InputMaybe<Jsonb_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  likes?: InputMaybe<Like_Bool_Exp>;
  page?: InputMaybe<Page_Bool_Exp>;
  pageId?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Comment_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  replies?: InputMaybe<Comment_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Comment" */
export enum Comment_Constraint {
  /** unique or primary key constraint */
  CommentPkey = 'Comment_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Comment_Delete_At_Path_Input = {
  content?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Comment_Delete_Elem_Input = {
  content?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Comment_Delete_Key_Input = {
  content?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "Comment" */
export type Comment_Insert_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  likes?: InputMaybe<Like_Arr_Rel_Insert_Input>;
  page?: InputMaybe<Page_Obj_Rel_Insert_Input>;
  pageId?: InputMaybe<Scalars['uuid']>;
  parent?: InputMaybe<Comment_Obj_Rel_Insert_Input>;
  parentId?: InputMaybe<Scalars['uuid']>;
  replies?: InputMaybe<Comment_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Comment_Max_Fields = {
  __typename?: 'Comment_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  pageId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Comment" */
export type Comment_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pageId?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Comment_Min_Fields = {
  __typename?: 'Comment_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  pageId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Comment" */
export type Comment_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pageId?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Comment" */
export type Comment_Mutation_Response = {
  __typename?: 'Comment_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Comment>;
};

/** input type for inserting object relation for remote table "Comment" */
export type Comment_Obj_Rel_Insert_Input = {
  data: Comment_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Comment_On_Conflict>;
};

/** on conflict condition type for table "Comment" */
export type Comment_On_Conflict = {
  constraint: Comment_Constraint;
  update_columns?: Array<Comment_Update_Column>;
  where?: InputMaybe<Comment_Bool_Exp>;
};

/** Ordering options when selecting data from "Comment". */
export type Comment_Order_By = {
  content?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  likes_aggregate?: InputMaybe<Like_Aggregate_Order_By>;
  page?: InputMaybe<Page_Order_By>;
  pageId?: InputMaybe<Order_By>;
  parent?: InputMaybe<Comment_Order_By>;
  parentId?: InputMaybe<Order_By>;
  replies_aggregate?: InputMaybe<Comment_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Comment */
export type Comment_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Comment_Prepend_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Comment" */
export enum Comment_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Id = 'id',
  /** column name */
  PageId = 'pageId',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Comment" */
export type Comment_Set_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  pageId?: InputMaybe<Scalars['uuid']>;
  parentId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Comment" */
export enum Comment_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Id = 'id',
  /** column name */
  PageId = 'pageId',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "Like" */
export type Like = {
  __typename?: 'Like';
  /** An object relationship */
  User: User;
  /** An object relationship */
  comment: Comment;
  commentId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['uuid'];
};

/** aggregated selection of "Like" */
export type Like_Aggregate = {
  __typename?: 'Like_aggregate';
  aggregate?: Maybe<Like_Aggregate_Fields>;
  nodes: Array<Like>;
};

/** aggregate fields of "Like" */
export type Like_Aggregate_Fields = {
  __typename?: 'Like_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Like_Max_Fields>;
  min?: Maybe<Like_Min_Fields>;
};


/** aggregate fields of "Like" */
export type Like_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Like_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Like" */
export type Like_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Like_Max_Order_By>;
  min?: InputMaybe<Like_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Like" */
export type Like_Arr_Rel_Insert_Input = {
  data: Array<Like_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Like_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Like". All fields are combined with a logical 'AND'. */
export type Like_Bool_Exp = {
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<Like_Bool_Exp>>;
  _not?: InputMaybe<Like_Bool_Exp>;
  _or?: InputMaybe<Array<Like_Bool_Exp>>;
  comment?: InputMaybe<Comment_Bool_Exp>;
  commentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Like" */
export enum Like_Constraint {
  /** unique or primary key constraint */
  LikeCommentIdUserIdKey = 'Like_commentId_userId_key',
  /** unique or primary key constraint */
  LikePkey = 'Like_pkey'
}

/** input type for inserting data into table "Like" */
export type Like_Insert_Input = {
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  comment?: InputMaybe<Comment_Obj_Rel_Insert_Input>;
  commentId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Like_Max_Fields = {
  __typename?: 'Like_max_fields';
  commentId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Like" */
export type Like_Max_Order_By = {
  commentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Like_Min_Fields = {
  __typename?: 'Like_min_fields';
  commentId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Like" */
export type Like_Min_Order_By = {
  commentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Like" */
export type Like_Mutation_Response = {
  __typename?: 'Like_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Like>;
};

/** on conflict condition type for table "Like" */
export type Like_On_Conflict = {
  constraint: Like_Constraint;
  update_columns?: Array<Like_Update_Column>;
  where?: InputMaybe<Like_Bool_Exp>;
};

/** Ordering options when selecting data from "Like". */
export type Like_Order_By = {
  User?: InputMaybe<User_Order_By>;
  comment?: InputMaybe<Comment_Order_By>;
  commentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Like */
export type Like_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Like" */
export enum Like_Select_Column {
  /** column name */
  CommentId = 'commentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Like" */
export type Like_Set_Input = {
  commentId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Like" */
export enum Like_Update_Column {
  /** column name */
  CommentId = 'commentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "Member" */
export type Member = {
  __typename?: 'Member';
  /** An object relationship */
  Role: Role;
  /** An object relationship */
  Team: Team;
  /** An object relationship */
  User: User;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Role_Enum;
  teamId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['uuid'];
};

/** aggregated selection of "Member" */
export type Member_Aggregate = {
  __typename?: 'Member_aggregate';
  aggregate?: Maybe<Member_Aggregate_Fields>;
  nodes: Array<Member>;
};

/** aggregate fields of "Member" */
export type Member_Aggregate_Fields = {
  __typename?: 'Member_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Member_Max_Fields>;
  min?: Maybe<Member_Min_Fields>;
};


/** aggregate fields of "Member" */
export type Member_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Member" */
export type Member_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Member_Max_Order_By>;
  min?: InputMaybe<Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Member" */
export type Member_Arr_Rel_Insert_Input = {
  data: Array<Member_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Member_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Member". All fields are combined with a logical 'AND'. */
export type Member_Bool_Exp = {
  Role?: InputMaybe<Role_Bool_Exp>;
  Team?: InputMaybe<Team_Bool_Exp>;
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<Member_Bool_Exp>>;
  _not?: InputMaybe<Member_Bool_Exp>;
  _or?: InputMaybe<Array<Member_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Role_Enum_Comparison_Exp>;
  teamId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Member" */
export enum Member_Constraint {
  /** unique or primary key constraint */
  MemberPkey = 'Member_pkey',
  /** unique or primary key constraint */
  MemberTeamIdUserIdKey = 'Member_teamId_userId_key'
}

/** input type for inserting data into table "Member" */
export type Member_Insert_Input = {
  Role?: InputMaybe<Role_Obj_Rel_Insert_Input>;
  Team?: InputMaybe<Team_Obj_Rel_Insert_Input>;
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Role_Enum>;
  teamId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Member_Max_Fields = {
  __typename?: 'Member_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Member" */
export type Member_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  teamId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Member_Min_Fields = {
  __typename?: 'Member_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Member" */
export type Member_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  teamId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Member" */
export type Member_Mutation_Response = {
  __typename?: 'Member_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Member>;
};

/** on conflict condition type for table "Member" */
export type Member_On_Conflict = {
  constraint: Member_Constraint;
  update_columns?: Array<Member_Update_Column>;
  where?: InputMaybe<Member_Bool_Exp>;
};

/** Ordering options when selecting data from "Member". */
export type Member_Order_By = {
  Role?: InputMaybe<Role_Order_By>;
  Team?: InputMaybe<Team_Order_By>;
  User?: InputMaybe<User_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  teamId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Member */
export type Member_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Member" */
export enum Member_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  TeamId = 'teamId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Member" */
export type Member_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Role_Enum>;
  teamId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Member" */
export enum Member_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  TeamId = 'teamId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "Page" */
export type Page = {
  __typename?: 'Page';
  /** An array relationship */
  comments: Array<Comment>;
  /** An aggregate relationship */
  comments_aggregate: Comment_Aggregate;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Project;
  projectId: Scalars['uuid'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  url: Scalars['String'];
};


/** columns and relationships of "Page" */
export type PageCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


/** columns and relationships of "Page" */
export type PageComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};

/** aggregated selection of "Page" */
export type Page_Aggregate = {
  __typename?: 'Page_aggregate';
  aggregate?: Maybe<Page_Aggregate_Fields>;
  nodes: Array<Page>;
};

/** aggregate fields of "Page" */
export type Page_Aggregate_Fields = {
  __typename?: 'Page_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Page_Max_Fields>;
  min?: Maybe<Page_Min_Fields>;
};


/** aggregate fields of "Page" */
export type Page_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Page_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Page" */
export type Page_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Page_Max_Order_By>;
  min?: InputMaybe<Page_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Page" */
export type Page_Arr_Rel_Insert_Input = {
  data: Array<Page_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Page_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Page". All fields are combined with a logical 'AND'. */
export type Page_Bool_Exp = {
  _and?: InputMaybe<Array<Page_Bool_Exp>>;
  _not?: InputMaybe<Page_Bool_Exp>;
  _or?: InputMaybe<Array<Page_Bool_Exp>>;
  comments?: InputMaybe<Comment_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Page" */
export enum Page_Constraint {
  /** unique or primary key constraint */
  PagePkey = 'Page_pkey',
  /** unique or primary key constraint */
  PageUrlKey = 'Page_url_key'
}

/** input type for inserting data into table "Page" */
export type Page_Insert_Input = {
  comments?: InputMaybe<Comment_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Page_Max_Fields = {
  __typename?: 'Page_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Page" */
export type Page_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Page_Min_Fields = {
  __typename?: 'Page_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Page" */
export type Page_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Page" */
export type Page_Mutation_Response = {
  __typename?: 'Page_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Page>;
};

/** input type for inserting object relation for remote table "Page" */
export type Page_Obj_Rel_Insert_Input = {
  data: Page_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Page_On_Conflict>;
};

/** on conflict condition type for table "Page" */
export type Page_On_Conflict = {
  constraint: Page_Constraint;
  update_columns?: Array<Page_Update_Column>;
  where?: InputMaybe<Page_Bool_Exp>;
};

/** Ordering options when selecting data from "Page". */
export type Page_Order_By = {
  comments_aggregate?: InputMaybe<Comment_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Page */
export type Page_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Page" */
export enum Page_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "Page" */
export type Page_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "Page" */
export enum Page_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url'
}

/** columns and relationships of "Project" */
export type Project = {
  __typename?: 'Project';
  /** An object relationship */
  Team?: Maybe<Team>;
  /** An object relationship */
  User?: Maybe<User>;
  createdAt: Scalars['timestamptz'];
  domain: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  pages: Array<Page>;
  /** An aggregate relationship */
  pages_aggregate: Page_Aggregate;
  teamId?: Maybe<Scalars['uuid']>;
  theme?: Maybe<Scalars['jsonb']>;
  updatedAt: Scalars['timestamptz'];
  userId?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "Project" */
export type ProjectPagesArgs = {
  distinct_on?: InputMaybe<Array<Page_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Page_Order_By>>;
  where?: InputMaybe<Page_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectPages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Page_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Page_Order_By>>;
  where?: InputMaybe<Page_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectThemeArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "Project" */
export type Project_Aggregate = {
  __typename?: 'Project_aggregate';
  aggregate?: Maybe<Project_Aggregate_Fields>;
  nodes: Array<Project>;
};

/** aggregate fields of "Project" */
export type Project_Aggregate_Fields = {
  __typename?: 'Project_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Project_Max_Fields>;
  min?: Maybe<Project_Min_Fields>;
};


/** aggregate fields of "Project" */
export type Project_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Project_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Project" */
export type Project_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Max_Order_By>;
  min?: InputMaybe<Project_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Project_Append_Input = {
  theme?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Project" */
export type Project_Arr_Rel_Insert_Input = {
  data: Array<Project_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Project_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export type Project_Bool_Exp = {
  Team?: InputMaybe<Team_Bool_Exp>;
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<Project_Bool_Exp>>;
  _not?: InputMaybe<Project_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  pages?: InputMaybe<Page_Bool_Exp>;
  teamId?: InputMaybe<Uuid_Comparison_Exp>;
  theme?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Project" */
export enum Project_Constraint {
  /** unique or primary key constraint */
  ProjectDomainKey = 'Project_domain_key',
  /** unique or primary key constraint */
  ProjectPkey = 'Project_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Project_Delete_At_Path_Input = {
  theme?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Project_Delete_Elem_Input = {
  theme?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Project_Delete_Key_Input = {
  theme?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "Project" */
export type Project_Insert_Input = {
  Team?: InputMaybe<Team_Obj_Rel_Insert_Input>;
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  pages?: InputMaybe<Page_Arr_Rel_Insert_Input>;
  teamId?: InputMaybe<Scalars['uuid']>;
  theme?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Project_Max_Fields = {
  __typename?: 'Project_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Project" */
export type Project_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  teamId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Min_Fields = {
  __typename?: 'Project_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Project" */
export type Project_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  teamId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Project" */
export type Project_Mutation_Response = {
  __typename?: 'Project_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Project>;
};

/** input type for inserting object relation for remote table "Project" */
export type Project_Obj_Rel_Insert_Input = {
  data: Project_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Project_On_Conflict>;
};

/** on conflict condition type for table "Project" */
export type Project_On_Conflict = {
  constraint: Project_Constraint;
  update_columns?: Array<Project_Update_Column>;
  where?: InputMaybe<Project_Bool_Exp>;
};

/** Ordering options when selecting data from "Project". */
export type Project_Order_By = {
  Team?: InputMaybe<Team_Order_By>;
  User?: InputMaybe<User_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  pages_aggregate?: InputMaybe<Page_Aggregate_Order_By>;
  teamId?: InputMaybe<Order_By>;
  theme?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Project */
export type Project_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Project_Prepend_Input = {
  theme?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Project" */
export enum Project_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TeamId = 'teamId',
  /** column name */
  Theme = 'theme',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Project" */
export type Project_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['uuid']>;
  theme?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Project" */
export enum Project_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TeamId = 'teamId',
  /** column name */
  Theme = 'theme',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/**
 * User's role in teams
 *
 *
 * columns and relationships of "Role"
 *
 */
export type Role = {
  __typename?: 'Role';
  comment?: Maybe<Scalars['String']>;
  /** An array relationship */
  members: Array<Member>;
  /** An aggregate relationship */
  members_aggregate: Member_Aggregate;
  value: Scalars['String'];
};


/**
 * User's role in teams
 *
 *
 * columns and relationships of "Role"
 *
 */
export type RoleMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/**
 * User's role in teams
 *
 *
 * columns and relationships of "Role"
 *
 */
export type RoleMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};

/** aggregated selection of "Role" */
export type Role_Aggregate = {
  __typename?: 'Role_aggregate';
  aggregate?: Maybe<Role_Aggregate_Fields>;
  nodes: Array<Role>;
};

/** aggregate fields of "Role" */
export type Role_Aggregate_Fields = {
  __typename?: 'Role_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Role_Max_Fields>;
  min?: Maybe<Role_Min_Fields>;
};


/** aggregate fields of "Role" */
export type Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "Role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Bool_Exp>>;
  _not?: InputMaybe<Role_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  members?: InputMaybe<Member_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Role" */
export enum Role_Constraint {
  /** unique or primary key constraint */
  RolePkey = 'Role_pkey'
}

export enum Role_Enum {
  /** Manager of a team */
  Manager = 'manager',
  /** Normal user */
  User = 'user'
}

/** Boolean expression to compare columns of type "Role_enum". All fields are combined with logical 'AND'. */
export type Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Role_Enum>;
  _in?: InputMaybe<Array<Role_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Role_Enum>;
  _nin?: InputMaybe<Array<Role_Enum>>;
};

/** input type for inserting data into table "Role" */
export type Role_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Role_Max_Fields = {
  __typename?: 'Role_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Role_Min_Fields = {
  __typename?: 'Role_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "Role" */
export type Role_Mutation_Response = {
  __typename?: 'Role_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Role>;
};

/** input type for inserting object relation for remote table "Role" */
export type Role_Obj_Rel_Insert_Input = {
  data: Role_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Role_On_Conflict>;
};

/** on conflict condition type for table "Role" */
export type Role_On_Conflict = {
  constraint: Role_Constraint;
  update_columns?: Array<Role_Update_Column>;
  where?: InputMaybe<Role_Bool_Exp>;
};

/** Ordering options when selecting data from "Role". */
export type Role_Order_By = {
  comment?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Role */
export type Role_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "Role" */
export enum Role_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "Role" */
export type Role_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "Role" */
export enum Role_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "Session" */
export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['timestamptz'];
  expires: Scalars['timestamptz'];
  id: Scalars['uuid'];
  sessionToken: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
};

/** aggregated selection of "Session" */
export type Session_Aggregate = {
  __typename?: 'Session_aggregate';
  aggregate?: Maybe<Session_Aggregate_Fields>;
  nodes: Array<Session>;
};

/** aggregate fields of "Session" */
export type Session_Aggregate_Fields = {
  __typename?: 'Session_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Session_Max_Fields>;
  min?: Maybe<Session_Min_Fields>;
};


/** aggregate fields of "Session" */
export type Session_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Session" */
export type Session_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Session_Max_Order_By>;
  min?: InputMaybe<Session_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Session" */
export type Session_Arr_Rel_Insert_Input = {
  data: Array<Session_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Session_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Session". All fields are combined with a logical 'AND'. */
export type Session_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Bool_Exp>>;
  _not?: InputMaybe<Session_Bool_Exp>;
  _or?: InputMaybe<Array<Session_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  sessionToken?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Session" */
export enum Session_Constraint {
  /** unique or primary key constraint */
  SessionPkey = 'Session_pkey',
  /** unique or primary key constraint */
  SessionSessionTokenKey = 'Session_sessionToken_key'
}

/** input type for inserting data into table "Session" */
export type Session_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  sessionToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Session_Max_Fields = {
  __typename?: 'Session_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expires?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  sessionToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Session" */
export type Session_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sessionToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Session_Min_Fields = {
  __typename?: 'Session_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expires?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  sessionToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Session" */
export type Session_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sessionToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Session" */
export type Session_Mutation_Response = {
  __typename?: 'Session_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Session>;
};

/** on conflict condition type for table "Session" */
export type Session_On_Conflict = {
  constraint: Session_Constraint;
  update_columns?: Array<Session_Update_Column>;
  where?: InputMaybe<Session_Bool_Exp>;
};

/** Ordering options when selecting data from "Session". */
export type Session_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sessionToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Session */
export type Session_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Session" */
export enum Session_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'sessionToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Session" */
export type Session_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  sessionToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Session" */
export enum Session_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'sessionToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Team" */
export type Team = {
  __typename?: 'Team';
  /** An array relationship */
  Members: Array<Member>;
  /** An aggregate relationship */
  Members_aggregate: Member_Aggregate;
  /** An array relationship */
  Projects: Array<Project>;
  /** An aggregate relationship */
  Projects_aggregate: Project_Aggregate;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  uid?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Team" */
export type TeamMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "Team" */
export type TeamMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "Team" */
export type TeamProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "Team" */
export type TeamProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};

/** aggregated selection of "Team" */
export type Team_Aggregate = {
  __typename?: 'Team_aggregate';
  aggregate?: Maybe<Team_Aggregate_Fields>;
  nodes: Array<Team>;
};

/** aggregate fields of "Team" */
export type Team_Aggregate_Fields = {
  __typename?: 'Team_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Team_Max_Fields>;
  min?: Maybe<Team_Min_Fields>;
};


/** aggregate fields of "Team" */
export type Team_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Team_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "Team". All fields are combined with a logical 'AND'. */
export type Team_Bool_Exp = {
  Members?: InputMaybe<Member_Bool_Exp>;
  Projects?: InputMaybe<Project_Bool_Exp>;
  _and?: InputMaybe<Array<Team_Bool_Exp>>;
  _not?: InputMaybe<Team_Bool_Exp>;
  _or?: InputMaybe<Array<Team_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  uid?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Team" */
export enum Team_Constraint {
  /** unique or primary key constraint */
  TeamPkey = 'Team_pkey',
  /** unique or primary key constraint */
  TeamUidKey = 'Team_uid_key'
}

/** input type for inserting data into table "Team" */
export type Team_Insert_Input = {
  Members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
  Projects?: InputMaybe<Project_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Team_Max_Fields = {
  __typename?: 'Team_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Team_Min_Fields = {
  __typename?: 'Team_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "Team" */
export type Team_Mutation_Response = {
  __typename?: 'Team_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Team>;
};

/** input type for inserting object relation for remote table "Team" */
export type Team_Obj_Rel_Insert_Input = {
  data: Team_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Team_On_Conflict>;
};

/** on conflict condition type for table "Team" */
export type Team_On_Conflict = {
  constraint: Team_Constraint;
  update_columns?: Array<Team_Update_Column>;
  where?: InputMaybe<Team_Bool_Exp>;
};

/** Ordering options when selecting data from "Team". */
export type Team_Order_By = {
  Members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
  Projects_aggregate?: InputMaybe<Project_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Team */
export type Team_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Team" */
export enum Team_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Uid = 'uid',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Team" */
export type Team_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "Team" */
export enum Team_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Uid = 'uid',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "User" */
export type User = {
  __typename?: 'User';
  /** An array relationship */
  accounts: Array<Account>;
  /** An aggregate relationship */
  accounts_aggregate: Account_Aggregate;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  /** An array relationship */
  comments: Array<Comment>;
  /** An aggregate relationship */
  comments_aggregate: Comment_Aggregate;
  createdAt: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An array relationship */
  likes: Array<Like>;
  /** An aggregate relationship */
  likes_aggregate: Like_Aggregate;
  /** An array relationship */
  members: Array<Member>;
  /** An aggregate relationship */
  members_aggregate: Member_Aggregate;
  name?: Maybe<Scalars['String']>;
  /** fetch data from the table: "Project" */
  projects: Array<Project>;
  /** An aggregate relationship */
  projects_aggregate: Project_Aggregate;
  /** An array relationship */
  sessions: Array<Session>;
  /** An aggregate relationship */
  sessions_aggregate: Session_Aggregate;
  twitterUserName?: Maybe<Scalars['String']>;
  type?: Maybe<UserType_Enum>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  userType?: Maybe<UserType>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


/** columns and relationships of "User" */
export type UserAccountsArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikesArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserSessionsArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};

/** columns and relationships of "UserType" */
export type UserType = {
  __typename?: 'UserType';
  /** An array relationship */
  Users: Array<User>;
  /** An aggregate relationship */
  Users_aggregate: User_Aggregate;
  comment: Scalars['String'];
  value: Scalars['String'];
};


/** columns and relationships of "UserType" */
export type UserTypeUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** columns and relationships of "UserType" */
export type UserTypeUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** aggregated selection of "UserType" */
export type UserType_Aggregate = {
  __typename?: 'UserType_aggregate';
  aggregate?: Maybe<UserType_Aggregate_Fields>;
  nodes: Array<UserType>;
};

/** aggregate fields of "UserType" */
export type UserType_Aggregate_Fields = {
  __typename?: 'UserType_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<UserType_Max_Fields>;
  min?: Maybe<UserType_Min_Fields>;
};


/** aggregate fields of "UserType" */
export type UserType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<UserType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "UserType". All fields are combined with a logical 'AND'. */
export type UserType_Bool_Exp = {
  Users?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<UserType_Bool_Exp>>;
  _not?: InputMaybe<UserType_Bool_Exp>;
  _or?: InputMaybe<Array<UserType_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "UserType" */
export enum UserType_Constraint {
  /** unique or primary key constraint */
  UserTypePkey = 'UserType_pkey'
}

export enum UserType_Enum {
  /** Site administrator */
  Admin = 'admin',
  /** Anonymous widget vsisitor */
  Anonymous = 'anonymous',
  Free = 'free',
  /** Paid user */
  Pro = 'pro'
}

/** Boolean expression to compare columns of type "UserType_enum". All fields are combined with logical 'AND'. */
export type UserType_Enum_Comparison_Exp = {
  _eq?: InputMaybe<UserType_Enum>;
  _in?: InputMaybe<Array<UserType_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<UserType_Enum>;
  _nin?: InputMaybe<Array<UserType_Enum>>;
};

/** input type for inserting data into table "UserType" */
export type UserType_Insert_Input = {
  Users?: InputMaybe<User_Arr_Rel_Insert_Input>;
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UserType_Max_Fields = {
  __typename?: 'UserType_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UserType_Min_Fields = {
  __typename?: 'UserType_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "UserType" */
export type UserType_Mutation_Response = {
  __typename?: 'UserType_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserType>;
};

/** input type for inserting object relation for remote table "UserType" */
export type UserType_Obj_Rel_Insert_Input = {
  data: UserType_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<UserType_On_Conflict>;
};

/** on conflict condition type for table "UserType" */
export type UserType_On_Conflict = {
  constraint: UserType_Constraint;
  update_columns?: Array<UserType_Update_Column>;
  where?: InputMaybe<UserType_Bool_Exp>;
};

/** Ordering options when selecting data from "UserType". */
export type UserType_Order_By = {
  Users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: UserType */
export type UserType_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "UserType" */
export enum UserType_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "UserType" */
export type UserType_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "UserType" */
export enum UserType_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** aggregated selection of "User" */
export type User_Aggregate = {
  __typename?: 'User_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "User" */
export type User_Aggregate_Fields = {
  __typename?: 'User_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "User" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "User" */
export type User_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Max_Order_By>;
  min?: InputMaybe<User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "User" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  accounts?: InputMaybe<Account_Bool_Exp>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  bio?: InputMaybe<String_Comparison_Exp>;
  comments?: InputMaybe<Comment_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  emailVerified?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  likes?: InputMaybe<Like_Bool_Exp>;
  members?: InputMaybe<Member_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  projects?: InputMaybe<Project_Bool_Exp>;
  sessions?: InputMaybe<Session_Bool_Exp>;
  twitterUserName?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<UserType_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userType?: InputMaybe<UserType_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "User" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = 'User_email_key',
  /** unique or primary key constraint */
  UserPkey = 'User_pkey',
  /** unique or primary key constraint */
  UserUsernameKey = 'User_username_key'
}

/** input type for inserting data into table "User" */
export type User_Insert_Input = {
  accounts?: InputMaybe<Account_Arr_Rel_Insert_Input>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  comments?: InputMaybe<Comment_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  likes?: InputMaybe<Like_Arr_Rel_Insert_Input>;
  members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  projects?: InputMaybe<Project_Arr_Rel_Insert_Input>;
  sessions?: InputMaybe<Session_Arr_Rel_Insert_Input>;
  twitterUserName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserType_Enum>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userType?: InputMaybe<UserType_Obj_Rel_Insert_Input>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'User_max_fields';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "User" */
export type User_Max_Order_By = {
  avatar?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emailVerified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  twitterUserName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'User_min_fields';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "User" */
export type User_Min_Order_By = {
  avatar?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emailVerified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  twitterUserName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "User" */
export type User_Mutation_Response = {
  __typename?: 'User_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "User" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on conflict condition type for table "User" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "User". */
export type User_Order_By = {
  accounts_aggregate?: InputMaybe<Account_Aggregate_Order_By>;
  avatar?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  comments_aggregate?: InputMaybe<Comment_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emailVerified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  likes_aggregate?: InputMaybe<Like_Aggregate_Order_By>;
  members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Project_Aggregate_Order_By>;
  sessions_aggregate?: InputMaybe<Session_Aggregate_Order_By>;
  twitterUserName?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userType?: InputMaybe<UserType_Order_By>;
  username?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: User */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TwitterUserName = 'twitterUserName',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "User" */
export type User_Set_Input = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  twitterUserName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserType_Enum>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** update columns of table "User" */
export enum User_Update_Column {
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TwitterUserName = 'twitterUserName',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Website = 'website'
}

/** columns and relationships of "VerificationToken" */
export type VerificationToken = {
  __typename?: 'VerificationToken';
  expires: Scalars['timestamptz'];
  id: Scalars['uuid'];
  identifier: Scalars['String'];
  token: Scalars['String'];
};

/** aggregated selection of "VerificationToken" */
export type VerificationToken_Aggregate = {
  __typename?: 'VerificationToken_aggregate';
  aggregate?: Maybe<VerificationToken_Aggregate_Fields>;
  nodes: Array<VerificationToken>;
};

/** aggregate fields of "VerificationToken" */
export type VerificationToken_Aggregate_Fields = {
  __typename?: 'VerificationToken_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<VerificationToken_Max_Fields>;
  min?: Maybe<VerificationToken_Min_Fields>;
};


/** aggregate fields of "VerificationToken" */
export type VerificationToken_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<VerificationToken_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "VerificationToken". All fields are combined with a logical 'AND'. */
export type VerificationToken_Bool_Exp = {
  _and?: InputMaybe<Array<VerificationToken_Bool_Exp>>;
  _not?: InputMaybe<VerificationToken_Bool_Exp>;
  _or?: InputMaybe<Array<VerificationToken_Bool_Exp>>;
  expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identifier?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "VerificationToken" */
export enum VerificationToken_Constraint {
  /** unique or primary key constraint */
  VerificationTokenIdentifierTokenKey = 'VerificationToken_identifier_token_key',
  /** unique or primary key constraint */
  VerificationTokenPkey = 'VerificationToken_pkey'
}

/** input type for inserting data into table "VerificationToken" */
export type VerificationToken_Insert_Input = {
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  identifier?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type VerificationToken_Max_Fields = {
  __typename?: 'VerificationToken_max_fields';
  expires?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  identifier?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type VerificationToken_Min_Fields = {
  __typename?: 'VerificationToken_min_fields';
  expires?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  identifier?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "VerificationToken" */
export type VerificationToken_Mutation_Response = {
  __typename?: 'VerificationToken_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<VerificationToken>;
};

/** on conflict condition type for table "VerificationToken" */
export type VerificationToken_On_Conflict = {
  constraint: VerificationToken_Constraint;
  update_columns?: Array<VerificationToken_Update_Column>;
  where?: InputMaybe<VerificationToken_Bool_Exp>;
};

/** Ordering options when selecting data from "VerificationToken". */
export type VerificationToken_Order_By = {
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identifier?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
};

/** primary key columns input for table: VerificationToken */
export type VerificationToken_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "VerificationToken" */
export enum VerificationToken_Select_Column {
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Token = 'token'
}

/** input type for updating data in table "VerificationToken" */
export type VerificationToken_Set_Input = {
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  identifier?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

/** update columns of table "VerificationToken" */
export enum VerificationToken_Update_Column {
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Token = 'token'
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete single row from the table: "Account" */
  deleteAccountByPk?: Maybe<Account>;
  /** delete data from the table: "Account" */
  deleteAccounts?: Maybe<Account_Mutation_Response>;
  /** delete single row from the table: "Comment" */
  deleteCommentByPk?: Maybe<Comment>;
  /** delete data from the table: "Comment" */
  deleteComments?: Maybe<Comment_Mutation_Response>;
  /** delete single row from the table: "Like" */
  deleteLikeByPk?: Maybe<Like>;
  /** delete data from the table: "Like" */
  deleteLikes?: Maybe<Like_Mutation_Response>;
  /** delete single row from the table: "Member" */
  deleteMemberByPk?: Maybe<Member>;
  /** delete data from the table: "Member" */
  deleteMembers?: Maybe<Member_Mutation_Response>;
  /** delete single row from the table: "Page" */
  deletePageByPk?: Maybe<Page>;
  /** delete data from the table: "Page" */
  deletePages?: Maybe<Page_Mutation_Response>;
  /** delete single row from the table: "Project" */
  deleteProjectByPk?: Maybe<Project>;
  /** delete data from the table: "Project" */
  deleteProjects?: Maybe<Project_Mutation_Response>;
  /** delete single row from the table: "Role" */
  deleteRoleByPk?: Maybe<Role>;
  /** delete data from the table: "Role" */
  deleteRoles?: Maybe<Role_Mutation_Response>;
  /** delete single row from the table: "Session" */
  deleteSessionByPk?: Maybe<Session>;
  /** delete data from the table: "Session" */
  deleteSessions?: Maybe<Session_Mutation_Response>;
  /** delete single row from the table: "Team" */
  deleteTeamByPk?: Maybe<Team>;
  /** delete data from the table: "Team" */
  deleteTeams?: Maybe<Team_Mutation_Response>;
  /** delete single row from the table: "User" */
  deleteUserByPk?: Maybe<User>;
  /** delete single row from the table: "UserType" */
  deleteUserTypeByPk?: Maybe<UserType>;
  /** delete data from the table: "UserType" */
  deleteUserTypes?: Maybe<UserType_Mutation_Response>;
  /** delete data from the table: "User" */
  deleteUsers?: Maybe<User_Mutation_Response>;
  /** delete data from the table: "VerificationToken" */
  delete_VerificationToken?: Maybe<VerificationToken_Mutation_Response>;
  /** delete single row from the table: "VerificationToken" */
  delete_VerificationToken_by_pk?: Maybe<VerificationToken>;
  /** insert data into the table: "Account" */
  insertAccounts?: Maybe<Account_Mutation_Response>;
  /** insert data into the table: "Comment" */
  insertComments?: Maybe<Comment_Mutation_Response>;
  /** insert data into the table: "Like" */
  insertLikes?: Maybe<Like_Mutation_Response>;
  /** insert data into the table: "Member" */
  insertMembers?: Maybe<Member_Mutation_Response>;
  /** insert a single row into the table: "Account" */
  insertOneAccount?: Maybe<Account>;
  /** insert a single row into the table: "Comment" */
  insertOneComment?: Maybe<Comment>;
  /** insert a single row into the table: "Like" */
  insertOneLike?: Maybe<Like>;
  /** insert a single row into the table: "Member" */
  insertOneMember?: Maybe<Member>;
  /** insert a single row into the table: "Page" */
  insertOnePage?: Maybe<Page>;
  /** insert a single row into the table: "Project" */
  insertOneProject?: Maybe<Project>;
  /** insert a single row into the table: "Role" */
  insertOneRole?: Maybe<Role>;
  /** insert a single row into the table: "Session" */
  insertOneSession?: Maybe<Session>;
  /** insert a single row into the table: "Team" */
  insertOneTeam?: Maybe<Team>;
  /** insert a single row into the table: "User" */
  insertOneUser?: Maybe<User>;
  /** insert a single row into the table: "UserType" */
  insertOneUserType?: Maybe<UserType>;
  /** insert data into the table: "Page" */
  insertPages?: Maybe<Page_Mutation_Response>;
  /** insert data into the table: "Project" */
  insertProjects?: Maybe<Project_Mutation_Response>;
  /** insert data into the table: "Role" */
  insertRoles?: Maybe<Role_Mutation_Response>;
  /** insert data into the table: "Session" */
  insertSessions?: Maybe<Session_Mutation_Response>;
  /** insert data into the table: "Team" */
  insertTeams?: Maybe<Team_Mutation_Response>;
  /** insert data into the table: "UserType" */
  insertUserTypes?: Maybe<UserType_Mutation_Response>;
  /** insert data into the table: "User" */
  insertUsers?: Maybe<User_Mutation_Response>;
  /** insert data into the table: "VerificationToken" */
  insert_VerificationToken?: Maybe<VerificationToken_Mutation_Response>;
  /** insert a single row into the table: "VerificationToken" */
  insert_VerificationToken_one?: Maybe<VerificationToken>;
  /** update single row of the table: "Account" */
  updateAccountByPk?: Maybe<Account>;
  /** update data of the table: "Account" */
  updateAccounts?: Maybe<Account_Mutation_Response>;
  /** update single row of the table: "Comment" */
  updateCommentByPk?: Maybe<Comment>;
  /** update data of the table: "Comment" */
  updateComments?: Maybe<Comment_Mutation_Response>;
  /** update single row of the table: "Like" */
  updateLikeByPk?: Maybe<Like>;
  /** update data of the table: "Like" */
  updateLikes?: Maybe<Like_Mutation_Response>;
  /** update single row of the table: "Member" */
  updateMemberByPk?: Maybe<Member>;
  /** update data of the table: "Member" */
  updateMembers?: Maybe<Member_Mutation_Response>;
  /** update single row of the table: "Page" */
  updatePageByPk?: Maybe<Page>;
  /** update data of the table: "Page" */
  updatePages?: Maybe<Page_Mutation_Response>;
  /** update single row of the table: "Project" */
  updateProjectByPk?: Maybe<Project>;
  /** update data of the table: "Project" */
  updateProjects?: Maybe<Project_Mutation_Response>;
  /** update single row of the table: "Role" */
  updateRoleByPk?: Maybe<Role>;
  /** update data of the table: "Role" */
  updateRoles?: Maybe<Role_Mutation_Response>;
  /** update single row of the table: "Session" */
  updateSessionByPk?: Maybe<Session>;
  /** update data of the table: "Session" */
  updateSessions?: Maybe<Session_Mutation_Response>;
  /** update single row of the table: "Team" */
  updateTeamByPk?: Maybe<Team>;
  /** update data of the table: "Team" */
  updateTeams?: Maybe<Team_Mutation_Response>;
  /** update single row of the table: "User" */
  updateUserByPk?: Maybe<User>;
  /** update single row of the table: "UserType" */
  updateUserTypeByPk?: Maybe<UserType>;
  /** update data of the table: "UserType" */
  updateUserTypes?: Maybe<UserType_Mutation_Response>;
  /** update data of the table: "User" */
  updateUsers?: Maybe<User_Mutation_Response>;
  /** update data of the table: "VerificationToken" */
  update_VerificationToken?: Maybe<VerificationToken_Mutation_Response>;
  /** update single row of the table: "VerificationToken" */
  update_VerificationToken_by_pk?: Maybe<VerificationToken>;
};


/** mutation root */
export type Mutation_RootDeleteAccountByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAccountsArgs = {
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteCommentByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteCommentsArgs = {
  where: Comment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteLikeByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteLikesArgs = {
  where: Like_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteMemberByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteMembersArgs = {
  where: Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeletePageByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeletePagesArgs = {
  where: Page_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteProjectByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectsArgs = {
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteRoleByPkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteRolesArgs = {
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteSessionByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteSessionsArgs = {
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTeamByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteTeamsArgs = {
  where: Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteUserByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUserTypeByPkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteUserTypesArgs = {
  where: UserType_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_VerificationTokenArgs = {
  where: VerificationToken_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_VerificationToken_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertAccountsArgs = {
  objects: Array<Account_Insert_Input>;
  on_conflict?: InputMaybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertCommentsArgs = {
  objects: Array<Comment_Insert_Input>;
  on_conflict?: InputMaybe<Comment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertLikesArgs = {
  objects: Array<Like_Insert_Input>;
  on_conflict?: InputMaybe<Like_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertMembersArgs = {
  objects: Array<Member_Insert_Input>;
  on_conflict?: InputMaybe<Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneAccountArgs = {
  object: Account_Insert_Input;
  on_conflict?: InputMaybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneCommentArgs = {
  object: Comment_Insert_Input;
  on_conflict?: InputMaybe<Comment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneLikeArgs = {
  object: Like_Insert_Input;
  on_conflict?: InputMaybe<Like_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneMemberArgs = {
  object: Member_Insert_Input;
  on_conflict?: InputMaybe<Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOnePageArgs = {
  object: Page_Insert_Input;
  on_conflict?: InputMaybe<Page_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneProjectArgs = {
  object: Project_Insert_Input;
  on_conflict?: InputMaybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneRoleArgs = {
  object: Role_Insert_Input;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneSessionArgs = {
  object: Session_Insert_Input;
  on_conflict?: InputMaybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneTeamArgs = {
  object: Team_Insert_Input;
  on_conflict?: InputMaybe<Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneUserArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneUserTypeArgs = {
  object: UserType_Insert_Input;
  on_conflict?: InputMaybe<UserType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertPagesArgs = {
  objects: Array<Page_Insert_Input>;
  on_conflict?: InputMaybe<Page_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsArgs = {
  objects: Array<Project_Insert_Input>;
  on_conflict?: InputMaybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertRolesArgs = {
  objects: Array<Role_Insert_Input>;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSessionsArgs = {
  objects: Array<Session_Insert_Input>;
  on_conflict?: InputMaybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTeamsArgs = {
  objects: Array<Team_Insert_Input>;
  on_conflict?: InputMaybe<Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUserTypesArgs = {
  objects: Array<UserType_Insert_Input>;
  on_conflict?: InputMaybe<UserType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_VerificationTokenArgs = {
  objects: Array<VerificationToken_Insert_Input>;
  on_conflict?: InputMaybe<VerificationToken_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_VerificationToken_OneArgs = {
  object: VerificationToken_Insert_Input;
  on_conflict?: InputMaybe<VerificationToken_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateAccountByPkArgs = {
  _set?: InputMaybe<Account_Set_Input>;
  pk_columns: Account_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAccountsArgs = {
  _set?: InputMaybe<Account_Set_Input>;
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateCommentByPkArgs = {
  _append?: InputMaybe<Comment_Append_Input>;
  _delete_at_path?: InputMaybe<Comment_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Comment_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Comment_Delete_Key_Input>;
  _prepend?: InputMaybe<Comment_Prepend_Input>;
  _set?: InputMaybe<Comment_Set_Input>;
  pk_columns: Comment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateCommentsArgs = {
  _append?: InputMaybe<Comment_Append_Input>;
  _delete_at_path?: InputMaybe<Comment_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Comment_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Comment_Delete_Key_Input>;
  _prepend?: InputMaybe<Comment_Prepend_Input>;
  _set?: InputMaybe<Comment_Set_Input>;
  where: Comment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateLikeByPkArgs = {
  _set?: InputMaybe<Like_Set_Input>;
  pk_columns: Like_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateLikesArgs = {
  _set?: InputMaybe<Like_Set_Input>;
  where: Like_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateMemberByPkArgs = {
  _set?: InputMaybe<Member_Set_Input>;
  pk_columns: Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateMembersArgs = {
  _set?: InputMaybe<Member_Set_Input>;
  where: Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdatePageByPkArgs = {
  _set?: InputMaybe<Page_Set_Input>;
  pk_columns: Page_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdatePagesArgs = {
  _set?: InputMaybe<Page_Set_Input>;
  where: Page_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateProjectByPkArgs = {
  _append?: InputMaybe<Project_Append_Input>;
  _delete_at_path?: InputMaybe<Project_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Project_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Project_Delete_Key_Input>;
  _prepend?: InputMaybe<Project_Prepend_Input>;
  _set?: InputMaybe<Project_Set_Input>;
  pk_columns: Project_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateProjectsArgs = {
  _append?: InputMaybe<Project_Append_Input>;
  _delete_at_path?: InputMaybe<Project_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Project_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Project_Delete_Key_Input>;
  _prepend?: InputMaybe<Project_Prepend_Input>;
  _set?: InputMaybe<Project_Set_Input>;
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateRoleByPkArgs = {
  _set?: InputMaybe<Role_Set_Input>;
  pk_columns: Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateRolesArgs = {
  _set?: InputMaybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateSessionByPkArgs = {
  _set?: InputMaybe<Session_Set_Input>;
  pk_columns: Session_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateSessionsArgs = {
  _set?: InputMaybe<Session_Set_Input>;
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTeamByPkArgs = {
  _set?: InputMaybe<Team_Set_Input>;
  pk_columns: Team_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTeamsArgs = {
  _set?: InputMaybe<Team_Set_Input>;
  where: Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUserByPkArgs = {
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUserTypeByPkArgs = {
  _set?: InputMaybe<UserType_Set_Input>;
  pk_columns: UserType_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUserTypesArgs = {
  _set?: InputMaybe<UserType_Set_Input>;
  where: UserType_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_VerificationTokenArgs = {
  _set?: InputMaybe<VerificationToken_Set_Input>;
  where: VerificationToken_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_VerificationToken_By_PkArgs = {
  _set?: InputMaybe<VerificationToken_Set_Input>;
  pk_columns: VerificationToken_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch aggregated fields from the table: "VerificationToken" */
  VerificationToken_aggregate: VerificationToken_Aggregate;
  /** fetch data from the table: "VerificationToken" using primary key columns */
  VerificationToken_by_pk?: Maybe<VerificationToken>;
  /** fetch aggregated fields from the table: "Account" */
  accountAggregate: Account_Aggregate;
  /** fetch data from the table: "Account" using primary key columns */
  accountByPk?: Maybe<Account>;
  /** An array relationship */
  accounts: Array<Account>;
  /** fetch aggregated fields from the table: "Comment" */
  commentAggregate: Comment_Aggregate;
  /** fetch data from the table: "Comment" using primary key columns */
  commentByPk?: Maybe<Comment>;
  /** An array relationship */
  comments: Array<Comment>;
  /** fetch aggregated fields from the table: "Like" */
  likeAggregate: Like_Aggregate;
  /** fetch data from the table: "Like" using primary key columns */
  likeByPk?: Maybe<Like>;
  /** An array relationship */
  likes: Array<Like>;
  /** fetch aggregated fields from the table: "Member" */
  memberAggregate: Member_Aggregate;
  /** fetch data from the table: "Member" using primary key columns */
  memberByPk?: Maybe<Member>;
  /** An array relationship */
  members: Array<Member>;
  /** fetch aggregated fields from the table: "Page" */
  pageAggregate: Page_Aggregate;
  /** fetch data from the table: "Page" using primary key columns */
  pageByPk?: Maybe<Page>;
  /** An array relationship */
  pages: Array<Page>;
  /** fetch aggregated fields from the table: "Project" */
  projectAggregate: Project_Aggregate;
  /** fetch data from the table: "Project" using primary key columns */
  projectByPk?: Maybe<Project>;
  /** fetch data from the table: "Project" */
  projects: Array<Project>;
  /** fetch aggregated fields from the table: "Role" */
  roleAggregate: Role_Aggregate;
  /** fetch data from the table: "Role" using primary key columns */
  roleByPk?: Maybe<Role>;
  /** fetch data from the table: "Role" */
  roles: Array<Role>;
  /** fetch aggregated fields from the table: "Session" */
  sessionAggregate: Session_Aggregate;
  /** fetch data from the table: "Session" using primary key columns */
  sessionByPk?: Maybe<Session>;
  /** An array relationship */
  sessions: Array<Session>;
  /** fetch aggregated fields from the table: "Team" */
  teamAggregate: Team_Aggregate;
  /** fetch data from the table: "Team" using primary key columns */
  teamByPk?: Maybe<Team>;
  /** fetch data from the table: "Team" */
  teams: Array<Team>;
  /** fetch aggregated fields from the table: "User" */
  userAggregate: User_Aggregate;
  /** fetch data from the table: "User" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch aggregated fields from the table: "UserType" */
  userTypeAggregate: UserType_Aggregate;
  /** fetch data from the table: "UserType" using primary key columns */
  userTypeByPk?: Maybe<UserType>;
  /** fetch data from the table: "UserType" */
  userTypes: Array<UserType>;
  /** fetch data from the table: "User" */
  users: Array<User>;
  /** fetch data from the table: "VerificationToken" */
  verificationRequests: Array<VerificationToken>;
};


export type Query_RootVerificationToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<VerificationToken_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VerificationToken_Order_By>>;
  where?: InputMaybe<VerificationToken_Bool_Exp>;
};


export type Query_RootVerificationToken_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAccountAggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootAccountByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootCommentAggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


export type Query_RootCommentByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


export type Query_RootLikeAggregateArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


export type Query_RootLikeByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


export type Query_RootMemberAggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Query_RootMemberByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Query_RootPageAggregateArgs = {
  distinct_on?: InputMaybe<Array<Page_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Page_Order_By>>;
  where?: InputMaybe<Page_Bool_Exp>;
};


export type Query_RootPageByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPagesArgs = {
  distinct_on?: InputMaybe<Array<Page_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Page_Order_By>>;
  where?: InputMaybe<Page_Bool_Exp>;
};


export type Query_RootProjectAggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Query_RootProjectByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Query_RootRoleAggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRoleByPkArgs = {
  value: Scalars['String'];
};


export type Query_RootRolesArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootSessionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Query_RootSessionByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Query_RootTeamAggregateArgs = {
  distinct_on?: InputMaybe<Array<Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Team_Order_By>>;
  where?: InputMaybe<Team_Bool_Exp>;
};


export type Query_RootTeamByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTeamsArgs = {
  distinct_on?: InputMaybe<Array<Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Team_Order_By>>;
  where?: InputMaybe<Team_Bool_Exp>;
};


export type Query_RootUserAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUserByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserTypeAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserType_Order_By>>;
  where?: InputMaybe<UserType_Bool_Exp>;
};


export type Query_RootUserTypeByPkArgs = {
  value: Scalars['String'];
};


export type Query_RootUserTypesArgs = {
  distinct_on?: InputMaybe<Array<UserType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserType_Order_By>>;
  where?: InputMaybe<UserType_Bool_Exp>;
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootVerificationRequestsArgs = {
  distinct_on?: InputMaybe<Array<VerificationToken_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VerificationToken_Order_By>>;
  where?: InputMaybe<VerificationToken_Bool_Exp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch aggregated fields from the table: "VerificationToken" */
  VerificationToken_aggregate: VerificationToken_Aggregate;
  /** fetch data from the table: "VerificationToken" using primary key columns */
  VerificationToken_by_pk?: Maybe<VerificationToken>;
  /** fetch aggregated fields from the table: "Account" */
  accountAggregate: Account_Aggregate;
  /** fetch data from the table: "Account" using primary key columns */
  accountByPk?: Maybe<Account>;
  /** An array relationship */
  accounts: Array<Account>;
  /** fetch aggregated fields from the table: "Comment" */
  commentAggregate: Comment_Aggregate;
  /** fetch data from the table: "Comment" using primary key columns */
  commentByPk?: Maybe<Comment>;
  /** An array relationship */
  comments: Array<Comment>;
  /** fetch aggregated fields from the table: "Like" */
  likeAggregate: Like_Aggregate;
  /** fetch data from the table: "Like" using primary key columns */
  likeByPk?: Maybe<Like>;
  /** An array relationship */
  likes: Array<Like>;
  /** fetch aggregated fields from the table: "Member" */
  memberAggregate: Member_Aggregate;
  /** fetch data from the table: "Member" using primary key columns */
  memberByPk?: Maybe<Member>;
  /** An array relationship */
  members: Array<Member>;
  /** fetch aggregated fields from the table: "Page" */
  pageAggregate: Page_Aggregate;
  /** fetch data from the table: "Page" using primary key columns */
  pageByPk?: Maybe<Page>;
  /** An array relationship */
  pages: Array<Page>;
  /** fetch aggregated fields from the table: "Project" */
  projectAggregate: Project_Aggregate;
  /** fetch data from the table: "Project" using primary key columns */
  projectByPk?: Maybe<Project>;
  /** fetch data from the table: "Project" */
  projects: Array<Project>;
  /** fetch aggregated fields from the table: "Role" */
  roleAggregate: Role_Aggregate;
  /** fetch data from the table: "Role" using primary key columns */
  roleByPk?: Maybe<Role>;
  /** fetch data from the table: "Role" */
  roles: Array<Role>;
  /** fetch aggregated fields from the table: "Session" */
  sessionAggregate: Session_Aggregate;
  /** fetch data from the table: "Session" using primary key columns */
  sessionByPk?: Maybe<Session>;
  /** An array relationship */
  sessions: Array<Session>;
  /** fetch aggregated fields from the table: "Team" */
  teamAggregate: Team_Aggregate;
  /** fetch data from the table: "Team" using primary key columns */
  teamByPk?: Maybe<Team>;
  /** fetch data from the table: "Team" */
  teams: Array<Team>;
  /** fetch aggregated fields from the table: "User" */
  userAggregate: User_Aggregate;
  /** fetch data from the table: "User" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch aggregated fields from the table: "UserType" */
  userTypeAggregate: UserType_Aggregate;
  /** fetch data from the table: "UserType" using primary key columns */
  userTypeByPk?: Maybe<UserType>;
  /** fetch data from the table: "UserType" */
  userTypes: Array<UserType>;
  /** fetch data from the table: "User" */
  users: Array<User>;
  /** fetch data from the table: "VerificationToken" */
  verificationRequests: Array<VerificationToken>;
};


export type Subscription_RootVerificationToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<VerificationToken_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VerificationToken_Order_By>>;
  where?: InputMaybe<VerificationToken_Bool_Exp>;
};


export type Subscription_RootVerificationToken_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAccountAggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAccountByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootCommentAggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


export type Subscription_RootCommentByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comment_Order_By>>;
  where?: InputMaybe<Comment_Bool_Exp>;
};


export type Subscription_RootLikeAggregateArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


export type Subscription_RootLikeByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Like_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Like_Order_By>>;
  where?: InputMaybe<Like_Bool_Exp>;
};


export type Subscription_RootMemberAggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Subscription_RootMemberByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Subscription_RootPageAggregateArgs = {
  distinct_on?: InputMaybe<Array<Page_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Page_Order_By>>;
  where?: InputMaybe<Page_Bool_Exp>;
};


export type Subscription_RootPageByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPagesArgs = {
  distinct_on?: InputMaybe<Array<Page_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Page_Order_By>>;
  where?: InputMaybe<Page_Bool_Exp>;
};


export type Subscription_RootProjectAggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Subscription_RootProjectByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Subscription_RootRoleAggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRoleByPkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootRolesArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootSessionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Subscription_RootSessionByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Subscription_RootTeamAggregateArgs = {
  distinct_on?: InputMaybe<Array<Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Team_Order_By>>;
  where?: InputMaybe<Team_Bool_Exp>;
};


export type Subscription_RootTeamByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTeamsArgs = {
  distinct_on?: InputMaybe<Array<Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Team_Order_By>>;
  where?: InputMaybe<Team_Bool_Exp>;
};


export type Subscription_RootUserAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUserByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserTypeAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserType_Order_By>>;
  where?: InputMaybe<UserType_Bool_Exp>;
};


export type Subscription_RootUserTypeByPkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootUserTypesArgs = {
  distinct_on?: InputMaybe<Array<UserType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserType_Order_By>>;
  where?: InputMaybe<UserType_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootVerificationRequestsArgs = {
  distinct_on?: InputMaybe<Array<VerificationToken_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VerificationToken_Order_By>>;
  where?: InputMaybe<VerificationToken_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};
