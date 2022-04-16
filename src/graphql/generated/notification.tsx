import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentNotificationMessagesSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
}>;

export type CurrentNotificationMessagesSubscription = {
  __typename?: 'subscription_root';
  notificationMessages: Array<{
    __typename?: 'NotificationMessage';
    id: string;
    type: Types.NotificationType_Enum;
    url: string;
    content?: string | null;
    read: boolean;
    createdAt: string;
    recipient: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
    triggeredBy: { __typename?: 'User'; id: string; name?: string | null; avatar?: string | null };
  }>;
};

export const CurrentNotificationMessagesDocument = gql`
  subscription currentNotificationMessages($userId: uuid!) {
    notificationMessages(where: { recipientId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      recipient {
        id
        name
        avatar
      }
      type
      url
      triggeredBy {
        id
        name
        avatar
      }
      content
      read
      createdAt
    }
  }
`;

export function useCurrentNotificationMessagesSubscription<
  TData = CurrentNotificationMessagesSubscription,
>(
  options: Omit<
    Urql.UseSubscriptionArgs<CurrentNotificationMessagesSubscriptionVariables>,
    'query'
  > = {},
  handler?: Urql.SubscriptionHandler<CurrentNotificationMessagesSubscription, TData>,
) {
  return Urql.useSubscription<
    CurrentNotificationMessagesSubscription,
    TData,
    CurrentNotificationMessagesSubscriptionVariables
  >({ query: CurrentNotificationMessagesDocument, ...options }, handler);
}
