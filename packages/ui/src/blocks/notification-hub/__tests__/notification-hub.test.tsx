import * as notificationModule from '@chirpy-dev/graphql';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '../../../__tests__/fixtures/page-render';
import { NotificationHub } from '../notification-hub';
import { messages } from '../stories/mock-data';

jest.mock('@chirpy-dev/graphql', () => {
  return {
    // Make exported object configable
    __esModule: true,
    ...jest.requireActual('@chirpy-dev/graphql'),
  };
});

jest
  .spyOn(notificationModule, 'useCurrentNotificationMessagesQuery')
  .mockReturnValue([
    { data: messages, fetching: false, stale: false },
    jest.fn(),
  ]);

// Run storybook to see the UI visually
describe('NotificationHub', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the messages', async () => {
    await renderDefaultNotificationHub();
    expect(screen.getAllByAltText(/avatar/)).toHaveLength(3);
    expect(screen.getAllByLabelText('Comment content')).toHaveLength(2);
  });

  it('Should mark the clicked message as read', async () => {
    const haveReadANotification = jest.fn();
    jest
      .spyOn(notificationModule, 'useHaveReadANotificationMutation')
      .mockReturnValue([{} as any, haveReadANotification]);
    await renderDefaultNotificationHub();

    await userEvent.click(screen.getAllByAltText(/avatar/)[0]);
    expect(haveReadANotification).toHaveBeenCalledTimes(1);
  });

  it('Should delete the message after click the delete button', async () => {
    const deleteNotificationMessage = jest.fn();
    jest
      .spyOn(notificationModule, 'useDeleteNotificationMessageMutation')
      .mockReturnValue([{} as any, deleteNotificationMessage]);
    await renderDefaultNotificationHub();

    await userEvent.click(
      screen.getAllByLabelText('Delete the notification message')[0],
    );
    expect(deleteNotificationMessage).toHaveBeenCalledTimes(1);
  });
});

async function renderDefaultNotificationHub() {
  pageRender(<NotificationHub />);
  const notificationButton = screen.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
}
