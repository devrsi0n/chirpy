import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type InsertOneLikeMutationVariables = Types.Exact<{
  commentId: Types.Scalars['uuid'];
}>;

export type InsertOneLikeMutation = {
  __typename?: 'mutation_root';
  insertOneLike?: { __typename?: 'Like'; id: string } | null;
};

export type DeleteLikeByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;

export type DeleteLikeByPkMutation = {
  __typename?: 'mutation_root';
  deleteLikeByPk?: { __typename?: 'Like'; id: string } | null;
};

export const InsertOneLikeDocument = gql`
  mutation insertOneLike($commentId: uuid!) {
    insertOneLike(object: { commentId: $commentId }) {
      id
    }
  }
`;

export function useInsertOneLikeMutation() {
  return Urql.useMutation<InsertOneLikeMutation, InsertOneLikeMutationVariables>(
    InsertOneLikeDocument,
  );
}
export const DeleteLikeByPkDocument = gql`
  mutation deleteLikeByPk($id: uuid!) {
    deleteLikeByPk(id: $id) {
      id
    }
  }
`;

export function useDeleteLikeByPkMutation() {
  return Urql.useMutation<DeleteLikeByPkMutation, DeleteLikeByPkMutationVariables>(
    DeleteLikeByPkDocument,
  );
}
