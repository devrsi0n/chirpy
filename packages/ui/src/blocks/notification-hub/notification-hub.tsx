import * as React from 'react';

import { Badge } from '../../components/badge';
import { Heading } from '../../components/heading';
import { IconBell } from '../../components/icons';
import { Menu } from '../../components/menu';
import { Spinner } from '../../components/spinner';
import { Text } from '../../components/text';
import { useCurrentUser } from '../../contexts/current-user-context';
import { trpcClient } from '../../utilities/trpc-client';
import styles from './notification-hub.module.scss';
import { NotificationItem } from './notification-item';

export function NotificationHub(): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const {
    data,
    refetch: refechMessages,
    isFetching,
  } = trpcClient.notification.messages.useQuery(undefined, {
    enabled: !!isSignIn,
  });

  const { mutateAsync: readANotification } =
    trpcClient.notification.read.useMutation();

  const { mutateAsync: deleteNotificationMessage } =
    trpcClient.notification.delete.useMutation();
  const hasUnreadNotifications = data?.some((msg) => !msg.read);
  return (
    <div className="mr-4 flex flex-row items-center justify-center">
      <Menu>
        <Menu.Button
          className={styles.menuButton}
          // Refetch when opening the menu
          onClick={(open) => !open && refechMessages()}
        >
          <IconBell size={22} />
          {hasUnreadNotifications && (
            <Badge className="absolute top-1 right-1 !bg-red-900 ring-1 ring-white dark:ring-black" />
          )}
        </Menu.Button>
        <Menu.Items>
          <Heading as="h4" className="px-5 py-3 font-bold">
            Notifications
          </Heading>
          {isFetching && (
            <Spinner className="absolute right-0 pr-6 pt-2"> </Spinner>
          )}
          {data && (data?.length || 0) > 0 ? (
            <div className="max-h-96 w-max overflow-y-auto">
              {data.map((msg, index) => (
                <NotificationItem
                  key={msg.id}
                  message={msg}
                  index={index}
                  length={data.length}
                  onClickCapture={async (messageId) => {
                    if (!!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
                      return;
                    }
                    await readANotification({ messageId });
                    await refechMessages();
                  }}
                  onClickDelete={async (messageId) => {
                    await deleteNotificationMessage({ messageId });
                    refechMessages();
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
