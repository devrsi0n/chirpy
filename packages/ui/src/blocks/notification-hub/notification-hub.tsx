import { trpc } from '@chirpy-dev/trpc/src/client';
import clsx from 'clsx';
import * as React from 'react';

import { Heading } from '../../components/heading';
import { IconBell } from '../../components/icons';
import { Menu } from '../../components/menu';
import { Spinner } from '../../components/spinner';
import { Text } from '../../components/text';
import { useCurrentUser } from '../../contexts/current-user-context';
import { useIsWidget } from '../../hooks';
import styles from './notification-hub.module.scss';
import { NotificationItem } from './notification-item';

export function NotificationHub(): JSX.Element {
  const { isSignIn, isPreview } = useCurrentUser();
  const {
    data,
    refetch: refetchMessages,
    isFetching,
  } = trpc.notification.messages.useQuery(undefined, {
    enabled: !!isSignIn && !isPreview,
  });

  const { mutateAsync: readANotification } =
    trpc.notification.read.useMutation();

  const { mutateAsync: deleteNotificationMessage } =
    trpc.notification.delete.useMutation();
  const hasUnreadNotifications = data?.some((msg) => !msg.read);
  const isWidget = useIsWidget();
  return (
    <div className="mr-4 flex flex-row items-center justify-center">
      <Menu>
        <Menu.Button
          className={styles.menuButton}
          // Refetch when opening the menu
          onClick={(open) => !open && refetchMessages()}
        >
          <IconBell size={22} />
          {hasUnreadNotifications && (
            <span className="absolute right-[3px] top-[1px] rounded-full bg-red-900 p-1 ring-1 ring-white dark:ring-black" />
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
            <div
              className={clsx(
                'w-max overflow-y-auto',
                isWidget ? 'max-h-[20rem]' : 'max-h-96',
              )}
            >
              {data.map((msg, index) => (
                <NotificationItem
                  key={msg.id}
                  message={msg}
                  index={index}
                  length={data.length}
                  onClickCapture={async (messageId) => {
                    if (!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
                      return;
                    }
                    await readANotification({ messageId });
                    await refetchMessages();
                  }}
                  onClickDelete={async (messageId) => {
                    await deleteNotificationMessage({ messageId });
                    refetchMessages();
                  }}
                />
              ))}
            </div>
          ) : (
            <Text
              variant="secondary"
              className="mx-5 mb-2 w-max rounded border border-dashed px-4 py-2 pb-2"
            >
              No messages yet
            </Text>
          )}
        </Menu.Items>
      </Menu>
    </div>
  );
}
