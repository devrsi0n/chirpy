import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '../../../__tests__/fixtures/page-render';
import { trpcClient } from '../../../utilities/trpc-client';
import { NotificationHub } from '../notification-hub';
import { messages } from '../stories/mock-data';

jest.spyOn(trpcClient.notification.messages, 'useQuery').mockReturnValue({
  data: messages,
  status: 'success',
  refetch: jest.fn(),
} as any);

// Run storybook to see the UI visually
describe('NotificationHub', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the messages', async () => {
    await renderDefaultNotificationHub();
    expect(screen.getAllByAltText(/avatar/)).toHaveLength(3);
  });

  it('Should mark the clicked message as read', async () => {
    const haveReadANotification = jest.fn();
    jest.spyOn(trpcClient.notification.read, 'useMutation').mockReturnValue({
      mutateAsync: haveReadANotification,
    } as any);
    await renderDefaultNotificationHub();

    await userEvent.click(screen.getAllByAltText(/avatar/)[0]);
    expect(haveReadANotification).toHaveBeenCalledTimes(1);
  });

  it('Should delete the message after click the delete button', async () => {
    const deleteNotificationMessage = jest.fn();
    jest.spyOn(trpcClient.notification.delete, 'useMutation').mockReturnValue({
      mutateAsync: deleteNotificationMessage,
    } as any);
    await renderDefaultNotificationHub();

    await userEvent.click(screen.getAllByLabelText('Delete the message')[0]);
    expect(deleteNotificationMessage).toHaveBeenCalledTimes(1);
  });
});

async function renderDefaultNotificationHub() {
  pageRender(<NotificationHub />);
  const notificationButton = screen.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
}
