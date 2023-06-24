import { Meta, StoryFn } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { NotificationHub } from '../notification-hub';

type NotificationHubType = typeof NotificationHub;
export default {
  title: 'Blocks/NotificationHub',
  component: NotificationHub,
} as Meta<NotificationHubType>;

const Template: StoryFn<NotificationHubType> = (args: any) => (
  <div>
    <NotificationHub {...args} />
  </div>
);

export const Empty = {
  render: Template,
};

export const Default = {
  render: Template,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const notificationButton = canvas.getByLabelText('click to open the menu');
    await userEvent.click(notificationButton);
  },
};
