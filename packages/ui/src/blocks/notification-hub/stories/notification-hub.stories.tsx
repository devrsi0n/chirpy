import { Meta, StoryFn } from '@storybook/nextjs';
import { userEvent, within } from 'storybook/test';

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

export const Empty = Template.bind({});
export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const notificationButton = canvas.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
};
