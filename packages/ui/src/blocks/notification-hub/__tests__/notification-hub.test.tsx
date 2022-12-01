import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '../../../__tests__/fixtures/page-render';
import {
  mockDeleteNotification,
  mockReadNotification,
} from '../../../__tests__/fixtures/server/rest-handlers';
import { NotificationHub } from '../notification-hub';

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
    await renderDefaultNotificationHub();

    await userEvent.click(screen.getAllByAltText(/avatar/)[0]);
    expect(mockReadNotification).toHaveBeenCalledTimes(1);
  });

  it('Should delete the message after click the delete button', async () => {
    await renderDefaultNotificationHub();

    await userEvent.click(screen.getAllByLabelText('Delete the message')[0]);
    expect(mockDeleteNotification).toHaveBeenCalledTimes(1);
  });
});

async function renderDefaultNotificationHub() {
  pageRender(<NotificationHub />);
  const notificationButton = screen.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
  await waitFor(() => {
    expect(screen.getAllByLabelText('Delete the message')[0]).toBeDefined();
  });
}
