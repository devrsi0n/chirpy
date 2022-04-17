import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from '../stories/notification-hub.stories';

const { Default } = composeStories(stories);
// Run storybook to see the UI
describe('NotificationHub', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the messages', async () => {
    render(<Default />);
    const notificationButton = screen.getByLabelText('click to open the menu');
    userEvent.click(notificationButton);
    expect(screen.getAllByAltText('Avatar')).toHaveLength(3);
    expect(screen.getAllByLabelText('Comment content')).toHaveLength(2);
  });
});
