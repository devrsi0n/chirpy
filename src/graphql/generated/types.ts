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
  jsonb: $TsAny;
  timestamptz: string;
  uuid: string;
};

/**
 * Account info for third part auth providers
 *
 *
 * columns and relationships of "Account"
 */
export type Account = {
  __typename?: 'Account';
  /** An object relationship */
  accountProvider: AccountProvider;
  /** providerName + providerAccountId = compoundId, to make sure the account unique. */
  compoundId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  provider: AccountProvider_Enum;
  providerAccountId: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['uuid']>;
};

/** columns and relationships of "AccountProvider" */
export type AccountProvider = {
  __typename?: 'AccountProvider';
  /** An array relationship */
  accounts: Array<Account>;
  /** An aggregated array relationship */
  accounts_aggregate: Account_Aggregate;
  comment: Scalars['String'];
  value: Scalars['String'];
};


/** columns and relationships of "AccountProvider" */
export type AccountProviderAccountsArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** columns and relationships of "AccountProvider" */
export type AccountProviderAccounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};

/** aggregated selection of "AccountProvider" */
export type AccountProvider_Aggregate = {
  __typename?: 'AccountProvider_aggregate';
  aggregate?: Maybe<AccountProvider_Aggregate_Fields>;
  nodes: Array<AccountProvider>;
};

/** aggregate fields of "AccountProvider" */
export type AccountProvider_Aggregate_Fields = {
  __typename?: 'AccountProvider_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<AccountProvider_Max_Fields>;
  min?: Maybe<AccountProvider_Min_Fields>;
};


/** aggregate fields of "AccountProvider" */
export type AccountProvider_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<AccountProvider_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AccountProvider" */
export type AccountProvider_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<AccountProvider_Max_Order_By>;
  min?: Maybe<AccountProvider_Min_Order_By>;
};

/** input type for inserting array relation for remote table "AccountProvider" */
export type AccountProvider_Arr_Rel_Insert_Input = {
  data: Array<AccountProvider_Insert_Input>;
  on_conflict?: Maybe<AccountProvider_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AccountProvider". All fields are combined with a logical 'AND'. */
export type AccountProvider_Bool_Exp = {
  _and?: Maybe<Array<Maybe<AccountProvider_Bool_Exp>>>;
  _not?: Maybe<AccountProvider_Bool_Exp>;
  _or?: Maybe<Array<Maybe<AccountProvider_Bool_Exp>>>;
  accounts?: Maybe<Account_Bool_Exp>;
  comment?: Maybe<String_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "AccountProvider" */
export enum AccountProvider_Constraint {
  /** unique or primary key constraint */
  AccountProviderPkey = 'AccountProvider_pkey'
}

export enum AccountProvider_Enum {
  Apple = 'Apple',
  Facebook = 'Facebook',
  GitHub = 'GitHub',
  Google = 'Google',
  Microsoft = 'Microsoft',
  Twitter = 'Twitter'
}

/** expression to compare columns of type AccountProvider_enum. All fields are combined with logical 'AND'. */
export type AccountProvider_Enum_Comparison_Exp = {
  _eq?: Maybe<AccountProvider_Enum>;
  _in?: Maybe<Array<AccountProvider_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<AccountProvider_Enum>;
  _nin?: Maybe<Array<AccountProvider_Enum>>;
};

/** input type for inserting data into table "AccountProvider" */
export type AccountProvider_Insert_Input = {
  accounts?: Maybe<Account_Arr_Rel_Insert_Input>;
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AccountProvider_Max_Fields = {
  __typename?: 'AccountProvider_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "AccountProvider" */
export type AccountProvider_Max_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type AccountProvider_Min_Fields = {
  __typename?: 'AccountProvider_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "AccountProvider" */
export type AccountProvider_Min_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "AccountProvider" */
export type AccountProvider_Mutation_Response = {
  __typename?: 'AccountProvider_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<AccountProvider>;
};

/** input type for inserting object relation for remote table "AccountProvider" */
export type AccountProvider_Obj_Rel_Insert_Input = {
  data: AccountProvider_Insert_Input;
  on_conflict?: Maybe<AccountProvider_On_Conflict>;
};

/** on conflict condition type for table "AccountProvider" */
export type AccountProvider_On_Conflict = {
  constraint: AccountProvider_Constraint;
  update_columns: Array<AccountProvider_Update_Column>;
  where?: Maybe<AccountProvider_Bool_Exp>;
};

/** ordering options when selecting data from "AccountProvider" */
export type AccountProvider_Order_By = {
  accounts_aggregate?: Maybe<Account_Aggregate_Order_By>;
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "AccountProvider" */
export type AccountProvider_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "AccountProvider" */
export enum AccountProvider_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "AccountProvider" */
export type AccountProvider_Set_Input = {
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "AccountProvider" */
export enum AccountProvider_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** aggregated selection of "Account" */
export type Account_Aggregate = {
  __typename?: 'Account_aggregate';
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

/** aggregate fields of "Account" */
export type Account_Aggregate_Fields = {
  __typename?: 'Account_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
};


/** aggregate fields of "Account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Account_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Account" */
export type Account_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Account_Max_Order_By>;
  min?: Maybe<Account_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Account" */
export type Account_Arr_Rel_Insert_Input = {
  data: Array<Account_Insert_Input>;
  on_conflict?: Maybe<Account_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Account_Bool_Exp>>>;
  _not?: Maybe<Account_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Account_Bool_Exp>>>;
  accountProvider?: Maybe<AccountProvider_Bool_Exp>;
  compoundId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  provider?: Maybe<AccountProvider_Enum_Comparison_Exp>;
  providerAccountId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Account" */
export enum Account_Constraint {
  /** unique or primary key constraint */
  AccountCompoundIdKey = 'Account_compoundId_key',
  /** unique or primary key constraint */
  AccountPkey = 'Account_pkey'
}

/** input type for inserting data into table "Account" */
export type Account_Insert_Input = {
  accountProvider?: Maybe<AccountProvider_Obj_Rel_Insert_Input>;
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  provider?: Maybe<AccountProvider_Enum>;
  providerAccountId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'Account_max_fields';
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  providerAccountId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Account" */
export type Account_Max_Order_By = {
  compoundId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  providerAccountId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'Account_min_fields';
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  providerAccountId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Account" */
export type Account_Min_Order_By = {
  compoundId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  providerAccountId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "Account" */
export type Account_Mutation_Response = {
  __typename?: 'Account_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Account>;
};

/** input type for inserting object relation for remote table "Account" */
export type Account_Obj_Rel_Insert_Input = {
  data: Account_Insert_Input;
  on_conflict?: Maybe<Account_On_Conflict>;
};

/** on conflict condition type for table "Account" */
export type Account_On_Conflict = {
  constraint: Account_Constraint;
  update_columns: Array<Account_Update_Column>;
  where?: Maybe<Account_Bool_Exp>;
};

/** ordering options when selecting data from "Account" */
export type Account_Order_By = {
  accountProvider?: Maybe<AccountProvider_Order_By>;
  compoundId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  provider?: Maybe<Order_By>;
  providerAccountId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "Account" */
export type Account_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Account" */
export enum Account_Select_Column {
  /** column name */
  CompoundId = 'compoundId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderAccountId = 'providerAccountId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Account" */
export type Account_Set_Input = {
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  provider?: Maybe<AccountProvider_Enum>;
  providerAccountId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** update columns of table "Account" */
export enum Account_Update_Column {
  /** column name */
  CompoundId = 'compoundId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderAccountId = 'providerAccountId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "Comment" */
export type Comment = {
  __typename?: 'Comment';
  content: Scalars['jsonb'];
  createdAt: Scalars['timestamptz'];
  depth: Scalars['Int'];
  id: Scalars['uuid'];
  /** An array relationship */
  likes: Array<Like>;
  /** An aggregated array relationship */
  likes_aggregate: Like_Aggregate;
  /** An object relationship */
  page: Page;
  pageId: Scalars['uuid'];
  /** An object relationship */
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  replies: Array<Comment>;
  /** An aggregated array relationship */
  replies_aggregate: Comment_Aggregate;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
};


/** columns and relationships of "Comment" */
export type CommentContentArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "Comment" */
export type CommentLikesArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** columns and relationships of "Comment" */
export type CommentLikes_AggregateArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** columns and relationships of "Comment" */
export type CommentRepliesArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** columns and relationships of "Comment" */
export type CommentReplies_AggregateArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
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
  avg?: Maybe<Comment_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Comment_Max_Fields>;
  min?: Maybe<Comment_Min_Fields>;
  stddev?: Maybe<Comment_Stddev_Fields>;
  stddev_pop?: Maybe<Comment_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Comment_Stddev_Samp_Fields>;
  sum?: Maybe<Comment_Sum_Fields>;
  var_pop?: Maybe<Comment_Var_Pop_Fields>;
  var_samp?: Maybe<Comment_Var_Samp_Fields>;
  variance?: Maybe<Comment_Variance_Fields>;
};


/** aggregate fields of "Comment" */
export type Comment_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Comment_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Comment" */
export type Comment_Aggregate_Order_By = {
  avg?: Maybe<Comment_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Comment_Max_Order_By>;
  min?: Maybe<Comment_Min_Order_By>;
  stddev?: Maybe<Comment_Stddev_Order_By>;
  stddev_pop?: Maybe<Comment_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Comment_Stddev_Samp_Order_By>;
  sum?: Maybe<Comment_Sum_Order_By>;
  var_pop?: Maybe<Comment_Var_Pop_Order_By>;
  var_samp?: Maybe<Comment_Var_Samp_Order_By>;
  variance?: Maybe<Comment_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Comment_Append_Input = {
  content?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Comment" */
export type Comment_Arr_Rel_Insert_Input = {
  data: Array<Comment_Insert_Input>;
  on_conflict?: Maybe<Comment_On_Conflict>;
};

/** aggregate avg on columns */
export type Comment_Avg_Fields = {
  __typename?: 'Comment_avg_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Comment" */
export type Comment_Avg_Order_By = {
  depth?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Comment". All fields are combined with a logical 'AND'. */
export type Comment_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Comment_Bool_Exp>>>;
  _not?: Maybe<Comment_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Comment_Bool_Exp>>>;
  content?: Maybe<Jsonb_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  depth?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  likes?: Maybe<Like_Bool_Exp>;
  page?: Maybe<Page_Bool_Exp>;
  pageId?: Maybe<Uuid_Comparison_Exp>;
  parent?: Maybe<Comment_Bool_Exp>;
  parentId?: Maybe<Uuid_Comparison_Exp>;
  replies?: Maybe<Comment_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Comment" */
export enum Comment_Constraint {
  /** unique or primary key constraint */
  CommentPkey = 'Comment_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Comment_Delete_At_Path_Input = {
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Comment_Delete_Elem_Input = {
  content?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Comment_Delete_Key_Input = {
  content?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "Comment" */
export type Comment_Inc_Input = {
  depth?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "Comment" */
export type Comment_Insert_Input = {
  content?: Maybe<Scalars['jsonb']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  depth?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  likes?: Maybe<Like_Arr_Rel_Insert_Input>;
  page?: Maybe<Page_Obj_Rel_Insert_Input>;
  pageId?: Maybe<Scalars['uuid']>;
  parent?: Maybe<Comment_Obj_Rel_Insert_Input>;
  parentId?: Maybe<Scalars['uuid']>;
  replies?: Maybe<Comment_Arr_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Comment_Max_Fields = {
  __typename?: 'Comment_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  depth?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  pageId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Comment" */
export type Comment_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  depth?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  pageId?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Comment_Min_Fields = {
  __typename?: 'Comment_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  depth?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  pageId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Comment" */
export type Comment_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  depth?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  pageId?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "Comment" */
export type Comment_Mutation_Response = {
  __typename?: 'Comment_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Comment>;
};

/** input type for inserting object relation for remote table "Comment" */
export type Comment_Obj_Rel_Insert_Input = {
  data: Comment_Insert_Input;
  on_conflict?: Maybe<Comment_On_Conflict>;
};

/** on conflict condition type for table "Comment" */
export type Comment_On_Conflict = {
  constraint: Comment_Constraint;
  update_columns: Array<Comment_Update_Column>;
  where?: Maybe<Comment_Bool_Exp>;
};

/** ordering options when selecting data from "Comment" */
export type Comment_Order_By = {
  content?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  depth?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  likes_aggregate?: Maybe<Like_Aggregate_Order_By>;
  page?: Maybe<Page_Order_By>;
  pageId?: Maybe<Order_By>;
  parent?: Maybe<Comment_Order_By>;
  parentId?: Maybe<Order_By>;
  replies_aggregate?: Maybe<Comment_Aggregate_Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "Comment" */
export type Comment_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Comment_Prepend_Input = {
  content?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "Comment" */
export enum Comment_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Depth = 'depth',
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
  content?: Maybe<Scalars['jsonb']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  depth?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  pageId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Comment_Stddev_Fields = {
  __typename?: 'Comment_stddev_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Comment" */
export type Comment_Stddev_Order_By = {
  depth?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Comment_Stddev_Pop_Fields = {
  __typename?: 'Comment_stddev_pop_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Comment" */
export type Comment_Stddev_Pop_Order_By = {
  depth?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Comment_Stddev_Samp_Fields = {
  __typename?: 'Comment_stddev_samp_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Comment" */
export type Comment_Stddev_Samp_Order_By = {
  depth?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Comment_Sum_Fields = {
  __typename?: 'Comment_sum_fields';
  depth?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Comment" */
export type Comment_Sum_Order_By = {
  depth?: Maybe<Order_By>;
};

/** update columns of table "Comment" */
export enum Comment_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Depth = 'depth',
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

/** aggregate var_pop on columns */
export type Comment_Var_Pop_Fields = {
  __typename?: 'Comment_var_pop_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Comment" */
export type Comment_Var_Pop_Order_By = {
  depth?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Comment_Var_Samp_Fields = {
  __typename?: 'Comment_var_samp_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Comment" */
export type Comment_Var_Samp_Order_By = {
  depth?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Comment_Variance_Fields = {
  __typename?: 'Comment_variance_fields';
  depth?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Comment" */
export type Comment_Variance_Order_By = {
  depth?: Maybe<Order_By>;
};

/**
 * Event for telemetry
 *
 *
 * columns and relationships of "Event"
 */
export type Event = {
  __typename?: 'Event';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  params?: Maybe<Scalars['jsonb']>;
  referrer?: Maybe<Scalars['String']>;
  /** An object relationship */
  session: Session;
  sessionId: Scalars['uuid'];
  /** Event type, e.g. 'pageview', 'buttonClick' */
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  url: Scalars['String'];
};


/**
 * Event for telemetry
 *
 *
 * columns and relationships of "Event"
 */
export type EventParamsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "Event" */
export type Event_Aggregate = {
  __typename?: 'Event_aggregate';
  aggregate?: Maybe<Event_Aggregate_Fields>;
  nodes: Array<Event>;
};

/** aggregate fields of "Event" */
export type Event_Aggregate_Fields = {
  __typename?: 'Event_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Event_Max_Fields>;
  min?: Maybe<Event_Min_Fields>;
};


/** aggregate fields of "Event" */
export type Event_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Event_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Event" */
export type Event_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Event_Max_Order_By>;
  min?: Maybe<Event_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Event_Append_Input = {
  params?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Event" */
export type Event_Arr_Rel_Insert_Input = {
  data: Array<Event_Insert_Input>;
  on_conflict?: Maybe<Event_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Event". All fields are combined with a logical 'AND'. */
export type Event_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Event_Bool_Exp>>>;
  _not?: Maybe<Event_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Event_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  params?: Maybe<Jsonb_Comparison_Exp>;
  referrer?: Maybe<String_Comparison_Exp>;
  session?: Maybe<Session_Bool_Exp>;
  sessionId?: Maybe<Uuid_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Event" */
export enum Event_Constraint {
  /** unique or primary key constraint */
  EventPkey = 'Event_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Event_Delete_At_Path_Input = {
  params?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Event_Delete_Elem_Input = {
  params?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Event_Delete_Key_Input = {
  params?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "Event" */
export type Event_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  params?: Maybe<Scalars['jsonb']>;
  referrer?: Maybe<Scalars['String']>;
  session?: Maybe<Session_Obj_Rel_Insert_Input>;
  sessionId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Event_Max_Fields = {
  __typename?: 'Event_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  referrer?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Event" */
export type Event_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  referrer?: Maybe<Order_By>;
  sessionId?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Event_Min_Fields = {
  __typename?: 'Event_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  referrer?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Event" */
export type Event_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  referrer?: Maybe<Order_By>;
  sessionId?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** response of any mutation on the table "Event" */
export type Event_Mutation_Response = {
  __typename?: 'Event_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Event>;
};

/** input type for inserting object relation for remote table "Event" */
export type Event_Obj_Rel_Insert_Input = {
  data: Event_Insert_Input;
  on_conflict?: Maybe<Event_On_Conflict>;
};

/** on conflict condition type for table "Event" */
export type Event_On_Conflict = {
  constraint: Event_Constraint;
  update_columns: Array<Event_Update_Column>;
  where?: Maybe<Event_Bool_Exp>;
};

/** ordering options when selecting data from "Event" */
export type Event_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  params?: Maybe<Order_By>;
  referrer?: Maybe<Order_By>;
  session?: Maybe<Session_Order_By>;
  sessionId?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** primary key columns input for table: "Event" */
export type Event_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Event_Prepend_Input = {
  params?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "Event" */
export enum Event_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Params = 'params',
  /** column name */
  Referrer = 'referrer',
  /** column name */
  SessionId = 'sessionId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "Event" */
export type Event_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  params?: Maybe<Scalars['jsonb']>;
  referrer?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** update columns of table "Event" */
export enum Event_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Params = 'params',
  /** column name */
  Referrer = 'referrer',
  /** column name */
  SessionId = 'sessionId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "Like" */
export type Like = {
  __typename?: 'Like';
  /** An object relationship */
  comment: Comment;
  commentId: Scalars['uuid'];
  /** Make sure a user like a comment no more than once */
  compoundId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Like_Max_Fields>;
  min?: Maybe<Like_Min_Fields>;
};


/** aggregate fields of "Like" */
export type Like_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Like_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Like" */
export type Like_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Like_Max_Order_By>;
  min?: Maybe<Like_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Like" */
export type Like_Arr_Rel_Insert_Input = {
  data: Array<Like_Insert_Input>;
  on_conflict?: Maybe<Like_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Like". All fields are combined with a logical 'AND'. */
export type Like_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Like_Bool_Exp>>>;
  _not?: Maybe<Like_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Like_Bool_Exp>>>;
  comment?: Maybe<Comment_Bool_Exp>;
  commentId?: Maybe<Uuid_Comparison_Exp>;
  compoundId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Like" */
export enum Like_Constraint {
  /** unique or primary key constraint */
  LikeCompoundIdKey = 'Like_compoundId_key',
  /** unique or primary key constraint */
  LikePkey = 'Like_pkey'
}

/** input type for inserting data into table "Like" */
export type Like_Insert_Input = {
  comment?: Maybe<Comment_Obj_Rel_Insert_Input>;
  commentId?: Maybe<Scalars['uuid']>;
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Like_Max_Fields = {
  __typename?: 'Like_max_fields';
  commentId?: Maybe<Scalars['uuid']>;
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Like" */
export type Like_Max_Order_By = {
  commentId?: Maybe<Order_By>;
  compoundId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Like_Min_Fields = {
  __typename?: 'Like_min_fields';
  commentId?: Maybe<Scalars['uuid']>;
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Like" */
export type Like_Min_Order_By = {
  commentId?: Maybe<Order_By>;
  compoundId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "Like" */
export type Like_Mutation_Response = {
  __typename?: 'Like_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Like>;
};

/** input type for inserting object relation for remote table "Like" */
export type Like_Obj_Rel_Insert_Input = {
  data: Like_Insert_Input;
  on_conflict?: Maybe<Like_On_Conflict>;
};

/** on conflict condition type for table "Like" */
export type Like_On_Conflict = {
  constraint: Like_Constraint;
  update_columns: Array<Like_Update_Column>;
  where?: Maybe<Like_Bool_Exp>;
};

/** ordering options when selecting data from "Like" */
export type Like_Order_By = {
  comment?: Maybe<Comment_Order_By>;
  commentId?: Maybe<Order_By>;
  compoundId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "Like" */
export type Like_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Like" */
export enum Like_Select_Column {
  /** column name */
  CommentId = 'commentId',
  /** column name */
  CompoundId = 'compoundId',
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
  commentId?: Maybe<Scalars['uuid']>;
  compoundId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** update columns of table "Like" */
export enum Like_Update_Column {
  /** column name */
  CommentId = 'commentId',
  /** column name */
  CompoundId = 'compoundId',
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
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Role_Enum;
  /** An object relationship */
  team: Team;
  teamId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Member_Max_Fields>;
  min?: Maybe<Member_Min_Fields>;
};


/** aggregate fields of "Member" */
export type Member_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Member_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Member" */
export type Member_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Member_Max_Order_By>;
  min?: Maybe<Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Member" */
export type Member_Arr_Rel_Insert_Input = {
  data: Array<Member_Insert_Input>;
  on_conflict?: Maybe<Member_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Member". All fields are combined with a logical 'AND'. */
export type Member_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Member_Bool_Exp>>>;
  _not?: Maybe<Member_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Member_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  role?: Maybe<Role_Enum_Comparison_Exp>;
  team?: Maybe<Team_Bool_Exp>;
  teamId?: Maybe<Uuid_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Member" */
export enum Member_Constraint {
  /** unique or primary key constraint */
  MemberPkey = 'Member_pkey'
}

/** input type for inserting data into table "Member" */
export type Member_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Role_Enum>;
  team?: Maybe<Team_Obj_Rel_Insert_Input>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
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
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  teamId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
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
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  teamId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "Member" */
export type Member_Mutation_Response = {
  __typename?: 'Member_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Member>;
};

/** input type for inserting object relation for remote table "Member" */
export type Member_Obj_Rel_Insert_Input = {
  data: Member_Insert_Input;
  on_conflict?: Maybe<Member_On_Conflict>;
};

/** on conflict condition type for table "Member" */
export type Member_On_Conflict = {
  constraint: Member_Constraint;
  update_columns: Array<Member_Update_Column>;
  where?: Maybe<Member_Bool_Exp>;
};

/** ordering options when selecting data from "Member" */
export type Member_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  role?: Maybe<Order_By>;
  team?: Maybe<Team_Order_By>;
  teamId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "Member" */
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
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Role_Enum>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
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
  /** An aggregated array relationship */
  comments_aggregate: Comment_Aggregate;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Project;
  projectId: Scalars['uuid'];
  title: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  url: Scalars['String'];
};


/** columns and relationships of "Page" */
export type PageCommentsArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** columns and relationships of "Page" */
export type PageComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Page_Max_Fields>;
  min?: Maybe<Page_Min_Fields>;
};


/** aggregate fields of "Page" */
export type Page_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Page" */
export type Page_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Page_Max_Order_By>;
  min?: Maybe<Page_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Page" */
export type Page_Arr_Rel_Insert_Input = {
  data: Array<Page_Insert_Input>;
  on_conflict?: Maybe<Page_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Page". All fields are combined with a logical 'AND'. */
export type Page_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Page_Bool_Exp>>>;
  _not?: Maybe<Page_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Page_Bool_Exp>>>;
  comments?: Maybe<Comment_Bool_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  projectId?: Maybe<Uuid_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
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
  comments?: Maybe<Comment_Arr_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  projectId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
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
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  projectId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
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
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  projectId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** response of any mutation on the table "Page" */
export type Page_Mutation_Response = {
  __typename?: 'Page_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Page>;
};

/** input type for inserting object relation for remote table "Page" */
export type Page_Obj_Rel_Insert_Input = {
  data: Page_Insert_Input;
  on_conflict?: Maybe<Page_On_Conflict>;
};

/** on conflict condition type for table "Page" */
export type Page_On_Conflict = {
  constraint: Page_Constraint;
  update_columns: Array<Page_Update_Column>;
  where?: Maybe<Page_Bool_Exp>;
};

/** ordering options when selecting data from "Page" */
export type Page_Order_By = {
  comments_aggregate?: Maybe<Comment_Aggregate_Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project?: Maybe<Project_Order_By>;
  projectId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** primary key columns input for table: "Page" */
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
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
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
  /** An array relationship */
  Sessions: Array<Session>;
  /** An aggregated array relationship */
  Sessions_aggregate: Session_Aggregate;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  pages: Array<Page>;
  /** An aggregated array relationship */
  pages_aggregate: Page_Aggregate;
  /** An object relationship */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['uuid']>;
  theme?: Maybe<Scalars['jsonb']>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "Project" */
export type ProjectSessionsArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectSessions_AggregateArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectThemeArgs = {
  path?: Maybe<Scalars['String']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Project_Max_Fields>;
  min?: Maybe<Project_Min_Fields>;
};


/** aggregate fields of "Project" */
export type Project_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Project" */
export type Project_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Project_Max_Order_By>;
  min?: Maybe<Project_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Project_Append_Input = {
  theme?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Project" */
export type Project_Arr_Rel_Insert_Input = {
  data: Array<Project_Insert_Input>;
  on_conflict?: Maybe<Project_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export type Project_Bool_Exp = {
  Sessions?: Maybe<Session_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Project_Bool_Exp>>>;
  _not?: Maybe<Project_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Project_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  pages?: Maybe<Page_Bool_Exp>;
  team?: Maybe<Team_Bool_Exp>;
  teamId?: Maybe<Uuid_Comparison_Exp>;
  theme?: Maybe<Jsonb_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Project" */
export enum Project_Constraint {
  /** unique or primary key constraint */
  ProjectPkey = 'Project_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Project_Delete_At_Path_Input = {
  theme?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Project_Delete_Elem_Input = {
  theme?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Project_Delete_Key_Input = {
  theme?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "Project" */
export type Project_Insert_Input = {
  Sessions?: Maybe<Session_Arr_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  pages?: Maybe<Page_Arr_Rel_Insert_Input>;
  team?: Maybe<Team_Obj_Rel_Insert_Input>;
  teamId?: Maybe<Scalars['uuid']>;
  theme?: Maybe<Scalars['jsonb']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Project_Max_Fields = {
  __typename?: 'Project_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Project" */
export type Project_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  teamId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Min_Fields = {
  __typename?: 'Project_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Project" */
export type Project_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  teamId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "Project" */
export type Project_Mutation_Response = {
  __typename?: 'Project_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Project>;
};

/** input type for inserting object relation for remote table "Project" */
export type Project_Obj_Rel_Insert_Input = {
  data: Project_Insert_Input;
  on_conflict?: Maybe<Project_On_Conflict>;
};

/** on conflict condition type for table "Project" */
export type Project_On_Conflict = {
  constraint: Project_Constraint;
  update_columns: Array<Project_Update_Column>;
  where?: Maybe<Project_Bool_Exp>;
};

/** ordering options when selecting data from "Project" */
export type Project_Order_By = {
  Sessions_aggregate?: Maybe<Session_Aggregate_Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  pages_aggregate?: Maybe<Page_Aggregate_Order_By>;
  team?: Maybe<Team_Order_By>;
  teamId?: Maybe<Order_By>;
  theme?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "Project" */
export type Project_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Project_Prepend_Input = {
  theme?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "Project" */
export enum Project_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
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
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['uuid']>;
  theme?: Maybe<Scalars['jsonb']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** update columns of table "Project" */
export enum Project_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
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
 * This role table isn't map to hasura role, use UserType instead.
 *
 *
 * columns and relationships of "Role"
 */
export type Role = {
  __typename?: 'Role';
  comment?: Maybe<Scalars['String']>;
  /** An array relationship */
  members: Array<Member>;
  /** An aggregated array relationship */
  members_aggregate: Member_Aggregate;
  value: Scalars['String'];
};


/**
 * This role table isn't map to hasura role, use UserType instead.
 *
 *
 * columns and relationships of "Role"
 */
export type RoleMembersArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/**
 * This role table isn't map to hasura role, use UserType instead.
 *
 *
 * columns and relationships of "Role"
 */
export type RoleMembers_AggregateArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Role_Max_Fields>;
  min?: Maybe<Role_Min_Fields>;
};


/** aggregate fields of "Role" */
export type Role_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Role_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Role" */
export type Role_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Role_Max_Order_By>;
  min?: Maybe<Role_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Role" */
export type Role_Arr_Rel_Insert_Input = {
  data: Array<Role_Insert_Input>;
  on_conflict?: Maybe<Role_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Role_Bool_Exp>>>;
  _not?: Maybe<Role_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Role_Bool_Exp>>>;
  comment?: Maybe<String_Comparison_Exp>;
  members?: Maybe<Member_Bool_Exp>;
  value?: Maybe<String_Comparison_Exp>;
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

/** expression to compare columns of type Role_enum. All fields are combined with logical 'AND'. */
export type Role_Enum_Comparison_Exp = {
  _eq?: Maybe<Role_Enum>;
  _in?: Maybe<Array<Role_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Role_Enum>;
  _nin?: Maybe<Array<Role_Enum>>;
};

/** input type for inserting data into table "Role" */
export type Role_Insert_Input = {
  comment?: Maybe<Scalars['String']>;
  members?: Maybe<Member_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Role_Max_Fields = {
  __typename?: 'Role_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Role" */
export type Role_Max_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Role_Min_Fields = {
  __typename?: 'Role_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Role" */
export type Role_Min_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "Role" */
export type Role_Mutation_Response = {
  __typename?: 'Role_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Role>;
};

/** input type for inserting object relation for remote table "Role" */
export type Role_Obj_Rel_Insert_Input = {
  data: Role_Insert_Input;
  on_conflict?: Maybe<Role_On_Conflict>;
};

/** on conflict condition type for table "Role" */
export type Role_On_Conflict = {
  constraint: Role_Constraint;
  update_columns: Array<Role_Update_Column>;
  where?: Maybe<Role_Bool_Exp>;
};

/** ordering options when selecting data from "Role" */
export type Role_Order_By = {
  comment?: Maybe<Order_By>;
  members_aggregate?: Maybe<Member_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "Role" */
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
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
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
  browser?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  created_at: Scalars['timestamptz'];
  /** desktop, laptop or mobile */
  device: Scalars['String'];
  /** An array relationship */
  events: Array<Event>;
  /** An aggregated array relationship */
  events_aggregate: Event_Aggregate;
  hostname?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  language: Scalars['String'];
  os: Scalars['String'];
  /** An object relationship */
  project: Project;
  projectId: Scalars['uuid'];
  /** Screen dimensions, it should be {width} x {height} */
  screen: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "Session" */
export type SessionEventsArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** columns and relationships of "Session" */
export type SessionEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Session_Max_Fields>;
  min?: Maybe<Session_Min_Fields>;
};


/** aggregate fields of "Session" */
export type Session_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Session_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Session" */
export type Session_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Session_Max_Order_By>;
  min?: Maybe<Session_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Session" */
export type Session_Arr_Rel_Insert_Input = {
  data: Array<Session_Insert_Input>;
  on_conflict?: Maybe<Session_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Session". All fields are combined with a logical 'AND'. */
export type Session_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Session_Bool_Exp>>>;
  _not?: Maybe<Session_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Session_Bool_Exp>>>;
  browser?: Maybe<String_Comparison_Exp>;
  country?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  device?: Maybe<String_Comparison_Exp>;
  events?: Maybe<Event_Bool_Exp>;
  hostname?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  language?: Maybe<String_Comparison_Exp>;
  os?: Maybe<String_Comparison_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  projectId?: Maybe<Uuid_Comparison_Exp>;
  screen?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Session" */
export enum Session_Constraint {
  /** unique or primary key constraint */
  SessionPkey = 'Session_pkey'
}

/** input type for inserting data into table "Session" */
export type Session_Insert_Input = {
  browser?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  device?: Maybe<Scalars['String']>;
  events?: Maybe<Event_Arr_Rel_Insert_Input>;
  hostname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  projectId?: Maybe<Scalars['uuid']>;
  screen?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Session_Max_Fields = {
  __typename?: 'Session_max_fields';
  browser?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  device?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['uuid']>;
  screen?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Session" */
export type Session_Max_Order_By = {
  browser?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  device?: Maybe<Order_By>;
  hostname?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  language?: Maybe<Order_By>;
  os?: Maybe<Order_By>;
  projectId?: Maybe<Order_By>;
  screen?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Session_Min_Fields = {
  __typename?: 'Session_min_fields';
  browser?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  device?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['uuid']>;
  screen?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Session" */
export type Session_Min_Order_By = {
  browser?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  device?: Maybe<Order_By>;
  hostname?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  language?: Maybe<Order_By>;
  os?: Maybe<Order_By>;
  projectId?: Maybe<Order_By>;
  screen?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "Session" */
export type Session_Mutation_Response = {
  __typename?: 'Session_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Session>;
};

/** input type for inserting object relation for remote table "Session" */
export type Session_Obj_Rel_Insert_Input = {
  data: Session_Insert_Input;
  on_conflict?: Maybe<Session_On_Conflict>;
};

/** on conflict condition type for table "Session" */
export type Session_On_Conflict = {
  constraint: Session_Constraint;
  update_columns: Array<Session_Update_Column>;
  where?: Maybe<Session_Bool_Exp>;
};

/** ordering options when selecting data from "Session" */
export type Session_Order_By = {
  browser?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  device?: Maybe<Order_By>;
  events_aggregate?: Maybe<Event_Aggregate_Order_By>;
  hostname?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  language?: Maybe<Order_By>;
  os?: Maybe<Order_By>;
  project?: Maybe<Project_Order_By>;
  projectId?: Maybe<Order_By>;
  screen?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "Session" */
export type Session_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Session" */
export enum Session_Select_Column {
  /** column name */
  Browser = 'browser',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Device = 'device',
  /** column name */
  Hostname = 'hostname',
  /** column name */
  Id = 'id',
  /** column name */
  Language = 'language',
  /** column name */
  Os = 'os',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Screen = 'screen',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "Session" */
export type Session_Set_Input = {
  browser?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  device?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['uuid']>;
  screen?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "Session" */
export enum Session_Update_Column {
  /** column name */
  Browser = 'browser',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Device = 'device',
  /** column name */
  Hostname = 'hostname',
  /** column name */
  Id = 'id',
  /** column name */
  Language = 'language',
  /** column name */
  Os = 'os',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Screen = 'screen',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "Team" */
export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An array relationship */
  members: Array<Member>;
  /** An aggregated array relationship */
  members_aggregate: Member_Aggregate;
  name: Scalars['String'];
  /** An array relationship */
  projects: Array<Project>;
  /** An aggregated array relationship */
  projects_aggregate: Project_Aggregate;
  uid?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Team" */
export type TeamMembersArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** columns and relationships of "Team" */
export type TeamMembers_AggregateArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** columns and relationships of "Team" */
export type TeamProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** columns and relationships of "Team" */
export type TeamProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Team_Max_Fields>;
  min?: Maybe<Team_Min_Fields>;
};


/** aggregate fields of "Team" */
export type Team_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Team_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Team" */
export type Team_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Team_Max_Order_By>;
  min?: Maybe<Team_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Team" */
export type Team_Arr_Rel_Insert_Input = {
  data: Array<Team_Insert_Input>;
  on_conflict?: Maybe<Team_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Team". All fields are combined with a logical 'AND'. */
export type Team_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Team_Bool_Exp>>>;
  _not?: Maybe<Team_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Team_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  members?: Maybe<Member_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  projects?: Maybe<Project_Bool_Exp>;
  uid?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
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
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  members?: Maybe<Member_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  projects?: Maybe<Project_Arr_Rel_Insert_Input>;
  uid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
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

/** order by max() on columns of table "Team" */
export type Team_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  uid?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
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

/** order by min() on columns of table "Team" */
export type Team_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  uid?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "Team" */
export type Team_Mutation_Response = {
  __typename?: 'Team_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Team>;
};

/** input type for inserting object relation for remote table "Team" */
export type Team_Obj_Rel_Insert_Input = {
  data: Team_Insert_Input;
  on_conflict?: Maybe<Team_On_Conflict>;
};

/** on conflict condition type for table "Team" */
export type Team_On_Conflict = {
  constraint: Team_Constraint;
  update_columns: Array<Team_Update_Column>;
  where?: Maybe<Team_Bool_Exp>;
};

/** ordering options when selecting data from "Team" */
export type Team_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  members_aggregate?: Maybe<Member_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  projects_aggregate?: Maybe<Project_Aggregate_Order_By>;
  uid?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "Team" */
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
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
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
  /** An aggregated array relationship */
  accounts_aggregate: Account_Aggregate;
  avatar: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  /** An array relationship */
  comments: Array<Comment>;
  /** An aggregated array relationship */
  comments_aggregate: Comment_Aggregate;
  createdAt: Scalars['timestamptz'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An array relationship */
  likes: Array<Like>;
  /** An aggregated array relationship */
  likes_aggregate: Like_Aggregate;
  /** An array relationship */
  members: Array<Member>;
  /** An aggregated array relationship */
  members_aggregate: Member_Aggregate;
  middleName?: Maybe<Scalars['String']>;
  /** An array relationship */
  projects: Array<Project>;
  /** An aggregated array relationship */
  projects_aggregate: Project_Aggregate;
  twitterUserName?: Maybe<Scalars['String']>;
  type: UserType_Enum;
  updatedAt: Scalars['timestamptz'];
  /** Unique name, used for search a person, e.g. at some one in a comment. */
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


/** columns and relationships of "User" */
export type UserAccountsArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserAccounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserCommentsArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikesArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikes_AggregateArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserMembersArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserMembers_AggregateArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

/**
 * UserType map to Hasura role
 *
 *
 * columns and relationships of "UserType"
 */
export type UserType = {
  __typename?: 'UserType';
  comment?: Maybe<Scalars['String']>;
  /** An array relationship */
  users: Array<User>;
  /** An aggregated array relationship */
  users_aggregate: User_Aggregate;
  value: Scalars['String'];
};


/**
 * UserType map to Hasura role
 *
 *
 * columns and relationships of "UserType"
 */
export type UserTypeUsersArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/**
 * UserType map to Hasura role
 *
 *
 * columns and relationships of "UserType"
 */
export type UserTypeUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UserType_Max_Fields>;
  min?: Maybe<UserType_Min_Fields>;
};


/** aggregate fields of "UserType" */
export type UserType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<UserType_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "UserType" */
export type UserType_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<UserType_Max_Order_By>;
  min?: Maybe<UserType_Min_Order_By>;
};

/** input type for inserting array relation for remote table "UserType" */
export type UserType_Arr_Rel_Insert_Input = {
  data: Array<UserType_Insert_Input>;
  on_conflict?: Maybe<UserType_On_Conflict>;
};

/** Boolean expression to filter rows from the table "UserType". All fields are combined with a logical 'AND'. */
export type UserType_Bool_Exp = {
  _and?: Maybe<Array<Maybe<UserType_Bool_Exp>>>;
  _not?: Maybe<UserType_Bool_Exp>;
  _or?: Maybe<Array<Maybe<UserType_Bool_Exp>>>;
  comment?: Maybe<String_Comparison_Exp>;
  users?: Maybe<User_Bool_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "UserType" */
export enum UserType_Constraint {
  /** unique or primary key constraint */
  UserTypePkey = 'UserType_pkey'
}

export enum UserType_Enum {
  /** Totalk administrator */
  Admin = 'admin',
  /** Anonymous widget vsisitor */
  Anonymous = 'anonymous',
  Free = 'free',
  /** Paid user */
  Pro = 'pro'
}

/** expression to compare columns of type UserType_enum. All fields are combined with logical 'AND'. */
export type UserType_Enum_Comparison_Exp = {
  _eq?: Maybe<UserType_Enum>;
  _in?: Maybe<Array<UserType_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<UserType_Enum>;
  _nin?: Maybe<Array<UserType_Enum>>;
};

/** input type for inserting data into table "UserType" */
export type UserType_Insert_Input = {
  comment?: Maybe<Scalars['String']>;
  users?: Maybe<User_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UserType_Max_Fields = {
  __typename?: 'UserType_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "UserType" */
export type UserType_Max_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type UserType_Min_Fields = {
  __typename?: 'UserType_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "UserType" */
export type UserType_Min_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "UserType" */
export type UserType_Mutation_Response = {
  __typename?: 'UserType_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<UserType>;
};

/** input type for inserting object relation for remote table "UserType" */
export type UserType_Obj_Rel_Insert_Input = {
  data: UserType_Insert_Input;
  on_conflict?: Maybe<UserType_On_Conflict>;
};

/** on conflict condition type for table "UserType" */
export type UserType_On_Conflict = {
  constraint: UserType_Constraint;
  update_columns: Array<UserType_Update_Column>;
  where?: Maybe<UserType_Bool_Exp>;
};

/** ordering options when selecting data from "UserType" */
export type UserType_Order_By = {
  comment?: Maybe<Order_By>;
  users_aggregate?: Maybe<User_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "UserType" */
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
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "User" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "User" */
export type User_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "User" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  accounts?: Maybe<Account_Bool_Exp>;
  avatar?: Maybe<String_Comparison_Exp>;
  bio?: Maybe<String_Comparison_Exp>;
  comments?: Maybe<Comment_Bool_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  displayName?: Maybe<String_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  familyName?: Maybe<String_Comparison_Exp>;
  givenName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  likes?: Maybe<Like_Bool_Exp>;
  members?: Maybe<Member_Bool_Exp>;
  middleName?: Maybe<String_Comparison_Exp>;
  projects?: Maybe<Project_Bool_Exp>;
  twitterUserName?: Maybe<String_Comparison_Exp>;
  type?: Maybe<UserType_Enum_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
  website?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "User" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = 'User_email_key',
  /** unique or primary key constraint */
  UserPkey = 'User_pkey',
  /** unique or primary key constraint */
  UserUidKey = 'User_uid_key'
}

/** input type for inserting data into table "User" */
export type User_Insert_Input = {
  accounts?: Maybe<Account_Arr_Rel_Insert_Input>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  comments?: Maybe<Comment_Arr_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  likes?: Maybe<Like_Arr_Rel_Insert_Input>;
  members?: Maybe<Member_Arr_Rel_Insert_Input>;
  middleName?: Maybe<Scalars['String']>;
  projects?: Maybe<Project_Arr_Rel_Insert_Input>;
  twitterUserName?: Maybe<Scalars['String']>;
  type?: Maybe<UserType_Enum>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'User_max_fields';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  middleName?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "User" */
export type User_Max_Order_By = {
  avatar?: Maybe<Order_By>;
  bio?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  displayName?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  familyName?: Maybe<Order_By>;
  givenName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  middleName?: Maybe<Order_By>;
  twitterUserName?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
  website?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'User_min_fields';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  middleName?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "User" */
export type User_Min_Order_By = {
  avatar?: Maybe<Order_By>;
  bio?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  displayName?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  familyName?: Maybe<Order_By>;
  givenName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  middleName?: Maybe<Order_By>;
  twitterUserName?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
  website?: Maybe<Order_By>;
};

/** response of any mutation on the table "User" */
export type User_Mutation_Response = {
  __typename?: 'User_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "User" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "User" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "User" */
export type User_Order_By = {
  accounts_aggregate?: Maybe<Account_Aggregate_Order_By>;
  avatar?: Maybe<Order_By>;
  bio?: Maybe<Order_By>;
  comments_aggregate?: Maybe<Comment_Aggregate_Order_By>;
  createdAt?: Maybe<Order_By>;
  displayName?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  familyName?: Maybe<Order_By>;
  givenName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  likes_aggregate?: Maybe<Like_Aggregate_Order_By>;
  members_aggregate?: Maybe<Member_Aggregate_Order_By>;
  middleName?: Maybe<Order_By>;
  projects_aggregate?: Maybe<Project_Aggregate_Order_By>;
  twitterUserName?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
  website?: Maybe<Order_By>;
};

/** primary key columns input for table: "User" */
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
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  FamilyName = 'familyName',
  /** column name */
  GivenName = 'givenName',
  /** column name */
  Id = 'id',
  /** column name */
  MiddleName = 'middleName',
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
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  middleName?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  type?: Maybe<UserType_Enum>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
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
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  FamilyName = 'familyName',
  /** column name */
  GivenName = 'givenName',
  /** column name */
  Id = 'id',
  /** column name */
  MiddleName = 'middleName',
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


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete single row from the table: "Account" */
  deleteAccountByPk?: Maybe<Account>;
  /** delete single row from the table: "AccountProvider" */
  deleteAccountProviderByPk?: Maybe<AccountProvider>;
  /** delete data from the table: "AccountProvider" */
  deleteAccountProviders?: Maybe<AccountProvider_Mutation_Response>;
  /** delete data from the table: "Account" */
  deleteAccounts?: Maybe<Account_Mutation_Response>;
  /** delete single row from the table: "Comment" */
  deleteCommentByPk?: Maybe<Comment>;
  /** delete data from the table: "Comment" */
  deleteComments?: Maybe<Comment_Mutation_Response>;
  /** delete single row from the table: "Event" */
  deleteEventByPk?: Maybe<Event>;
  /** delete data from the table: "Event" */
  deleteEvents?: Maybe<Event_Mutation_Response>;
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
  /** insert data into the table: "AccountProvider" */
  insertAccountProviders?: Maybe<AccountProvider_Mutation_Response>;
  /** insert data into the table: "Account" */
  insertAccounts?: Maybe<Account_Mutation_Response>;
  /** insert data into the table: "Comment" */
  insertComments?: Maybe<Comment_Mutation_Response>;
  /** insert data into the table: "Event" */
  insertEvents?: Maybe<Event_Mutation_Response>;
  /** insert data into the table: "Like" */
  insertLikes?: Maybe<Like_Mutation_Response>;
  /** insert data into the table: "Member" */
  insertMembers?: Maybe<Member_Mutation_Response>;
  /** insert a single row into the table: "Account" */
  insertOneAccount?: Maybe<Account>;
  /** insert a single row into the table: "AccountProvider" */
  insertOneAccountProvider?: Maybe<AccountProvider>;
  /** insert a single row into the table: "Comment" */
  insertOneComment?: Maybe<Comment>;
  /** insert a single row into the table: "Event" */
  insertOneEvent?: Maybe<Event>;
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
  /** update single row of the table: "Account" */
  updateAccountByPk?: Maybe<Account>;
  /** update single row of the table: "AccountProvider" */
  updateAccountProviderByPk?: Maybe<AccountProvider>;
  /** update data of the table: "AccountProvider" */
  updateAccountProviders?: Maybe<AccountProvider_Mutation_Response>;
  /** update data of the table: "Account" */
  updateAccounts?: Maybe<Account_Mutation_Response>;
  /** update single row of the table: "Comment" */
  updateCommentByPk?: Maybe<Comment>;
  /** update data of the table: "Comment" */
  updateComments?: Maybe<Comment_Mutation_Response>;
  /** update single row of the table: "Event" */
  updateEventByPk?: Maybe<Event>;
  /** update data of the table: "Event" */
  updateEvents?: Maybe<Event_Mutation_Response>;
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
};


/** mutation root */
export type Mutation_RootDeleteAccountByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAccountProviderByPkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAccountProvidersArgs = {
  where: AccountProvider_Bool_Exp;
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
export type Mutation_RootDeleteEventByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteEventsArgs = {
  where: Event_Bool_Exp;
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
export type Mutation_RootInsertAccountProvidersArgs = {
  objects: Array<AccountProvider_Insert_Input>;
  on_conflict?: Maybe<AccountProvider_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAccountsArgs = {
  objects: Array<Account_Insert_Input>;
  on_conflict?: Maybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertCommentsArgs = {
  objects: Array<Comment_Insert_Input>;
  on_conflict?: Maybe<Comment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertEventsArgs = {
  objects: Array<Event_Insert_Input>;
  on_conflict?: Maybe<Event_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertLikesArgs = {
  objects: Array<Like_Insert_Input>;
  on_conflict?: Maybe<Like_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertMembersArgs = {
  objects: Array<Member_Insert_Input>;
  on_conflict?: Maybe<Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneAccountArgs = {
  object: Account_Insert_Input;
  on_conflict?: Maybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneAccountProviderArgs = {
  object: AccountProvider_Insert_Input;
  on_conflict?: Maybe<AccountProvider_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneCommentArgs = {
  object: Comment_Insert_Input;
  on_conflict?: Maybe<Comment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneEventArgs = {
  object: Event_Insert_Input;
  on_conflict?: Maybe<Event_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneLikeArgs = {
  object: Like_Insert_Input;
  on_conflict?: Maybe<Like_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneMemberArgs = {
  object: Member_Insert_Input;
  on_conflict?: Maybe<Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOnePageArgs = {
  object: Page_Insert_Input;
  on_conflict?: Maybe<Page_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneProjectArgs = {
  object: Project_Insert_Input;
  on_conflict?: Maybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneRoleArgs = {
  object: Role_Insert_Input;
  on_conflict?: Maybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneSessionArgs = {
  object: Session_Insert_Input;
  on_conflict?: Maybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneTeamArgs = {
  object: Team_Insert_Input;
  on_conflict?: Maybe<Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneUserArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertOneUserTypeArgs = {
  object: UserType_Insert_Input;
  on_conflict?: Maybe<UserType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertPagesArgs = {
  objects: Array<Page_Insert_Input>;
  on_conflict?: Maybe<Page_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsArgs = {
  objects: Array<Project_Insert_Input>;
  on_conflict?: Maybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertRolesArgs = {
  objects: Array<Role_Insert_Input>;
  on_conflict?: Maybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSessionsArgs = {
  objects: Array<Session_Insert_Input>;
  on_conflict?: Maybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTeamsArgs = {
  objects: Array<Team_Insert_Input>;
  on_conflict?: Maybe<Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUserTypesArgs = {
  objects: Array<UserType_Insert_Input>;
  on_conflict?: Maybe<UserType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateAccountByPkArgs = {
  _set?: Maybe<Account_Set_Input>;
  pk_columns: Account_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAccountProviderByPkArgs = {
  _set?: Maybe<AccountProvider_Set_Input>;
  pk_columns: AccountProvider_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAccountProvidersArgs = {
  _set?: Maybe<AccountProvider_Set_Input>;
  where: AccountProvider_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAccountsArgs = {
  _set?: Maybe<Account_Set_Input>;
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateCommentByPkArgs = {
  _append?: Maybe<Comment_Append_Input>;
  _delete_at_path?: Maybe<Comment_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Comment_Delete_Elem_Input>;
  _delete_key?: Maybe<Comment_Delete_Key_Input>;
  _inc?: Maybe<Comment_Inc_Input>;
  _prepend?: Maybe<Comment_Prepend_Input>;
  _set?: Maybe<Comment_Set_Input>;
  pk_columns: Comment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateCommentsArgs = {
  _append?: Maybe<Comment_Append_Input>;
  _delete_at_path?: Maybe<Comment_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Comment_Delete_Elem_Input>;
  _delete_key?: Maybe<Comment_Delete_Key_Input>;
  _inc?: Maybe<Comment_Inc_Input>;
  _prepend?: Maybe<Comment_Prepend_Input>;
  _set?: Maybe<Comment_Set_Input>;
  where: Comment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateEventByPkArgs = {
  _append?: Maybe<Event_Append_Input>;
  _delete_at_path?: Maybe<Event_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Event_Delete_Elem_Input>;
  _delete_key?: Maybe<Event_Delete_Key_Input>;
  _prepend?: Maybe<Event_Prepend_Input>;
  _set?: Maybe<Event_Set_Input>;
  pk_columns: Event_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateEventsArgs = {
  _append?: Maybe<Event_Append_Input>;
  _delete_at_path?: Maybe<Event_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Event_Delete_Elem_Input>;
  _delete_key?: Maybe<Event_Delete_Key_Input>;
  _prepend?: Maybe<Event_Prepend_Input>;
  _set?: Maybe<Event_Set_Input>;
  where: Event_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateLikeByPkArgs = {
  _set?: Maybe<Like_Set_Input>;
  pk_columns: Like_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateLikesArgs = {
  _set?: Maybe<Like_Set_Input>;
  where: Like_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateMemberByPkArgs = {
  _set?: Maybe<Member_Set_Input>;
  pk_columns: Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateMembersArgs = {
  _set?: Maybe<Member_Set_Input>;
  where: Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdatePageByPkArgs = {
  _set?: Maybe<Page_Set_Input>;
  pk_columns: Page_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdatePagesArgs = {
  _set?: Maybe<Page_Set_Input>;
  where: Page_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateProjectByPkArgs = {
  _append?: Maybe<Project_Append_Input>;
  _delete_at_path?: Maybe<Project_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Project_Delete_Elem_Input>;
  _delete_key?: Maybe<Project_Delete_Key_Input>;
  _prepend?: Maybe<Project_Prepend_Input>;
  _set?: Maybe<Project_Set_Input>;
  pk_columns: Project_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateProjectsArgs = {
  _append?: Maybe<Project_Append_Input>;
  _delete_at_path?: Maybe<Project_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Project_Delete_Elem_Input>;
  _delete_key?: Maybe<Project_Delete_Key_Input>;
  _prepend?: Maybe<Project_Prepend_Input>;
  _set?: Maybe<Project_Set_Input>;
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateRoleByPkArgs = {
  _set?: Maybe<Role_Set_Input>;
  pk_columns: Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateRolesArgs = {
  _set?: Maybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateSessionByPkArgs = {
  _set?: Maybe<Session_Set_Input>;
  pk_columns: Session_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateSessionsArgs = {
  _set?: Maybe<Session_Set_Input>;
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTeamByPkArgs = {
  _set?: Maybe<Team_Set_Input>;
  pk_columns: Team_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTeamsArgs = {
  _set?: Maybe<Team_Set_Input>;
  where: Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUserByPkArgs = {
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUserTypeByPkArgs = {
  _set?: Maybe<UserType_Set_Input>;
  pk_columns: UserType_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUserTypesArgs = {
  _set?: Maybe<UserType_Set_Input>;
  where: UserType_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch aggregated fields from the table: "Account" */
  accountAggregate: Account_Aggregate;
  /** fetch data from the table: "Account" using primary key columns */
  accountByPk?: Maybe<Account>;
  /** fetch aggregated fields from the table: "AccountProvider" */
  accountProviderAggregate: AccountProvider_Aggregate;
  /** fetch data from the table: "AccountProvider" using primary key columns */
  accountProviderByPk?: Maybe<AccountProvider>;
  /** fetch data from the table: "AccountProvider" */
  accountProviders: Array<AccountProvider>;
  /** fetch data from the table: "Account" */
  accounts: Array<Account>;
  /** fetch aggregated fields from the table: "Comment" */
  commentAggregate: Comment_Aggregate;
  /** fetch data from the table: "Comment" using primary key columns */
  commentByPk?: Maybe<Comment>;
  /** fetch data from the table: "Comment" */
  comments: Array<Comment>;
  /** fetch aggregated fields from the table: "Event" */
  eventAggregate: Event_Aggregate;
  /** fetch data from the table: "Event" using primary key columns */
  eventByPk?: Maybe<Event>;
  /** fetch data from the table: "Event" */
  events: Array<Event>;
  /** fetch aggregated fields from the table: "Like" */
  likeAggregate: Like_Aggregate;
  /** fetch data from the table: "Like" using primary key columns */
  likeByPk?: Maybe<Like>;
  /** fetch data from the table: "Like" */
  likes: Array<Like>;
  /** fetch aggregated fields from the table: "Member" */
  memberAggregate: Member_Aggregate;
  /** fetch data from the table: "Member" using primary key columns */
  memberByPk?: Maybe<Member>;
  /** fetch data from the table: "Member" */
  members: Array<Member>;
  /** fetch aggregated fields from the table: "Page" */
  pageAggregate: Page_Aggregate;
  /** fetch data from the table: "Page" using primary key columns */
  pageByPk?: Maybe<Page>;
  /** fetch data from the table: "Page" */
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
  /** fetch data from the table: "Session" */
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
};


/** query root */
export type Query_RootAccountAggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** query root */
export type Query_RootAccountByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootAccountProviderAggregateArgs = {
  distinct_on?: Maybe<Array<AccountProvider_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AccountProvider_Order_By>>;
  where?: Maybe<AccountProvider_Bool_Exp>;
};


/** query root */
export type Query_RootAccountProviderByPkArgs = {
  value: Scalars['String'];
};


/** query root */
export type Query_RootAccountProvidersArgs = {
  distinct_on?: Maybe<Array<AccountProvider_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AccountProvider_Order_By>>;
  where?: Maybe<AccountProvider_Bool_Exp>;
};


/** query root */
export type Query_RootAccountsArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** query root */
export type Query_RootCommentAggregateArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** query root */
export type Query_RootCommentByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootCommentsArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** query root */
export type Query_RootEventAggregateArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** query root */
export type Query_RootEventByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEventsArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** query root */
export type Query_RootLikeAggregateArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** query root */
export type Query_RootLikeByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootLikesArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** query root */
export type Query_RootMemberAggregateArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** query root */
export type Query_RootMemberByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootMembersArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** query root */
export type Query_RootPageAggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** query root */
export type Query_RootPageByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** query root */
export type Query_RootProjectAggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** query root */
export type Query_RootProjectByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** query root */
export type Query_RootRoleAggregateArgs = {
  distinct_on?: Maybe<Array<Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Order_By>>;
  where?: Maybe<Role_Bool_Exp>;
};


/** query root */
export type Query_RootRoleByPkArgs = {
  value: Scalars['String'];
};


/** query root */
export type Query_RootRolesArgs = {
  distinct_on?: Maybe<Array<Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Order_By>>;
  where?: Maybe<Role_Bool_Exp>;
};


/** query root */
export type Query_RootSessionAggregateArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** query root */
export type Query_RootSessionByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootSessionsArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** query root */
export type Query_RootTeamAggregateArgs = {
  distinct_on?: Maybe<Array<Team_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Order_By>>;
  where?: Maybe<Team_Bool_Exp>;
};


/** query root */
export type Query_RootTeamByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTeamsArgs = {
  distinct_on?: Maybe<Array<Team_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Order_By>>;
  where?: Maybe<Team_Bool_Exp>;
};


/** query root */
export type Query_RootUserAggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUserByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUserTypeAggregateArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserType_Order_By>>;
  where?: Maybe<UserType_Bool_Exp>;
};


/** query root */
export type Query_RootUserTypeByPkArgs = {
  value: Scalars['String'];
};


/** query root */
export type Query_RootUserTypesArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserType_Order_By>>;
  where?: Maybe<UserType_Bool_Exp>;
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch aggregated fields from the table: "Account" */
  accountAggregate: Account_Aggregate;
  /** fetch data from the table: "Account" using primary key columns */
  accountByPk?: Maybe<Account>;
  /** fetch aggregated fields from the table: "AccountProvider" */
  accountProviderAggregate: AccountProvider_Aggregate;
  /** fetch data from the table: "AccountProvider" using primary key columns */
  accountProviderByPk?: Maybe<AccountProvider>;
  /** fetch data from the table: "AccountProvider" */
  accountProviders: Array<AccountProvider>;
  /** fetch data from the table: "Account" */
  accounts: Array<Account>;
  /** fetch aggregated fields from the table: "Comment" */
  commentAggregate: Comment_Aggregate;
  /** fetch data from the table: "Comment" using primary key columns */
  commentByPk?: Maybe<Comment>;
  /** fetch data from the table: "Comment" */
  comments: Array<Comment>;
  /** fetch aggregated fields from the table: "Event" */
  eventAggregate: Event_Aggregate;
  /** fetch data from the table: "Event" using primary key columns */
  eventByPk?: Maybe<Event>;
  /** fetch data from the table: "Event" */
  events: Array<Event>;
  /** fetch aggregated fields from the table: "Like" */
  likeAggregate: Like_Aggregate;
  /** fetch data from the table: "Like" using primary key columns */
  likeByPk?: Maybe<Like>;
  /** fetch data from the table: "Like" */
  likes: Array<Like>;
  /** fetch aggregated fields from the table: "Member" */
  memberAggregate: Member_Aggregate;
  /** fetch data from the table: "Member" using primary key columns */
  memberByPk?: Maybe<Member>;
  /** fetch data from the table: "Member" */
  members: Array<Member>;
  /** fetch aggregated fields from the table: "Page" */
  pageAggregate: Page_Aggregate;
  /** fetch data from the table: "Page" using primary key columns */
  pageByPk?: Maybe<Page>;
  /** fetch data from the table: "Page" */
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
  /** fetch data from the table: "Session" */
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
};


/** subscription root */
export type Subscription_RootAccountAggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccountByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootAccountProviderAggregateArgs = {
  distinct_on?: Maybe<Array<AccountProvider_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AccountProvider_Order_By>>;
  where?: Maybe<AccountProvider_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccountProviderByPkArgs = {
  value: Scalars['String'];
};


/** subscription root */
export type Subscription_RootAccountProvidersArgs = {
  distinct_on?: Maybe<Array<AccountProvider_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AccountProvider_Order_By>>;
  where?: Maybe<AccountProvider_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccountsArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCommentAggregateArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCommentByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootCommentsArgs = {
  distinct_on?: Maybe<Array<Comment_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comment_Order_By>>;
  where?: Maybe<Comment_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEventAggregateArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEventByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEventsArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLikeAggregateArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLikeByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootLikesArgs = {
  distinct_on?: Maybe<Array<Like_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Like_Order_By>>;
  where?: Maybe<Like_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMemberAggregateArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMemberByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMembersArgs = {
  distinct_on?: Maybe<Array<Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Member_Order_By>>;
  where?: Maybe<Member_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPageAggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPageByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProjectAggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProjectByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoleAggregateArgs = {
  distinct_on?: Maybe<Array<Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Order_By>>;
  where?: Maybe<Role_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoleByPkArgs = {
  value: Scalars['String'];
};


/** subscription root */
export type Subscription_RootRolesArgs = {
  distinct_on?: Maybe<Array<Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Order_By>>;
  where?: Maybe<Role_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSessionAggregateArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSessionByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootSessionsArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTeamAggregateArgs = {
  distinct_on?: Maybe<Array<Team_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Order_By>>;
  where?: Maybe<Team_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTeamByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTeamsArgs = {
  distinct_on?: Maybe<Array<Team_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Order_By>>;
  where?: Maybe<Team_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUserAggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUserByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUserTypeAggregateArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserType_Order_By>>;
  where?: Maybe<UserType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUserTypeByPkArgs = {
  value: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUserTypesArgs = {
  distinct_on?: Maybe<Array<UserType_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserType_Order_By>>;
  where?: Maybe<UserType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};
