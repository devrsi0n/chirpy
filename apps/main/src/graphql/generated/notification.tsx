import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentNotificationMessagesQueryVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
}>;

export type CurrentNotificationMessagesQuery = {
  __typename?: 'query_root';
  notificationMessages: Array<{
    __typename?: 'NotificationMessage';
    id: string;
    type: Types.NotificationType_Enum;
    url: string;
    content?: string | null;
    read: boolean;
    createdAt: string;
    recipient: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      image?: string | null;
    };
    triggeredBy: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }>;
};

export type HaveReadANotificationMutationVariables = Types.Exact<{
  messageId: Types.Scalars['uuid'];
}>;

export type HaveReadANotificationMutation = {
  __typename?: 'mutation_root';
  updateNotificationMessageByPk?: {
    __typename?: 'NotificationMessage';
    id: string;
  } | null;
};

export type DeleteNotificationMessageMutationVariables = Types.Exact<{
  messageId: Types.Scalars['uuid'];
}>;

export type DeleteNotificationMessageMutation = {
  __typename?: 'mutation_root';
  deleteNotificationMessageByPk?: {
    __typename?: 'NotificationMessage';
    id: string;
  } | null;
};

export const CurrentNotificationMessagesDocument = gql`
  query currentNotificationMessages($userId: uuid!) {
    notificationMessages(
      where: { recipientId: { _eq: $userId } }
      order_by: { createdAt: desc, read: asc }
    ) {
      id
      recipient {
        id
        name
        username
        email
        image
      }
      type
      url
      triggeredBy {
        id
        name
        username
        email
        image
      }
      content
      read
      createdAt
    }
  }
`;

export function useCurrentNotificationMessagesQuery(
  options: Omit<
    Urql.UseQueryArgs<CurrentNotificationMessagesQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<CurrentNotificationMessagesQuery>({
    query: CurrentNotificationMessagesDocument,
    ...options,
  });
}
export const HaveReadANotificationDocument = gql`
  mutation haveReadANotification($messageId: uuid!) {
    updateNotificationMessageByPk(
      pk_columns: { id: $messageId }
      _set: { read: true }
    ) {
      id
    }
  }
`;

export function useHaveReadANotificationMutation() {
  return Urql.useMutation<
    HaveReadANotificationMutation,
    HaveReadANotificationMutationVariables
  >(HaveReadANotificationDocument);
}
export const DeleteNotificationMessageDocument = gql`
  mutation deleteNotificationMessage($messageId: uuid!) {
    deleteNotificationMessageByPk(id: $messageId) {
      id
    }
  }
`;

export function useDeleteNotificationMessageMutation() {
  return Urql.useMutation<
    DeleteNotificationMessageMutation,
    DeleteNotificationMessageMutationVariables
  >(DeleteNotificationMessageDocument);
}
