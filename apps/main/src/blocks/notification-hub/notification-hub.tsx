import * as React from 'react';

import { Badge } from '$/components/badge';
import { Heading } from '$/components/heading';
import { IconBell } from '$/components/icons';
import { Menu } from '$/components/menu';
import { Spinner } from '$/components/spinner';
import { Text } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context';
import {
  useCurrentNotificationMessagesQuery,
  useDeleteNotificationMessageMutation,
  useHaveReadANotificationMutation,
} from '$/graphql/generated/notification';
import { useBypassCacheRefetch } from '$/hooks/use-bypass-cache-refetch';

import styles from './notification-hub.module.scss';
import { NotificationItem } from './notification-item';

export function NotificationHub(): JSX.Element {
  const { data: userData } = useCurrentUser();
  const [{ data, fetching }, refetchNotification] =
    useCurrentNotificationMessagesQuery({
      variables: {
        userId: userData.id || '-1',
      },
      pause: !userData.id,
    });
  const refetchWithoutCache = useBypassCacheRefetch(refetchNotification);
  const [{}, haveReadANotification] = useHaveReadANotificationMutation();
  const [{}, deleteNotificationMessage] =
    useDeleteNotificationMessageMutation();
  const hasUnreadNotifications = data?.notificationMessages.some(
    (msg) => !msg.read,
  );
  return (
    <div className="mr-4 flex flex-row items-center justify-center">
      <Menu>
        <Menu.Button
          className={styles.menuButton}
          // Refetch when opening the menu
          onClick={(open) => !open && refetchNotification()}
        >
          <IconBell size={22} />
          {hasUnreadNotifications && (
            <Badge className="absolute top-1 right-1 !bg-red-900 ring-1 ring-white dark:ring-black" />
          )}
        </Menu.Button>
        <Menu.Items className={styles.menuItems}>
          <Heading as="h4" className="px-5 py-3 font-bold">
            Notifications
          </Heading>
          {fetching && (
            <Spinner className="absolute right-0 pr-6 pt-2"> </Spinner>
          )}
          {data?.notificationMessages?.length || 0 > 0 ? (
            <div className="max-h-96 w-max overflow-y-auto">
              {data?.notificationMessages.map((msg, index) => (
                <NotificationItem
                  key={msg.id}
                  message={msg}
                  index={index}
                  length={data?.notificationMessages.length}
                  onClickCapture={(messageId) =>
                    haveReadANotification({ messageId })
                  }
                  onClickDelete={async (messageId) => {
                    await deleteNotificationMessage({ messageId });
                    refetchWithoutCache();
                  }}
                />
              ))}
            </div>
          ) : (
            <Text
              variant="secondary"
              className="mx-5 mb-2 w-max rounded border border-dashed py-2 px-4 pb-2"
            >
              No messages yet
            </Text>
          )}
        </Menu.Items>
      </Menu>
    </div>
  );
}
