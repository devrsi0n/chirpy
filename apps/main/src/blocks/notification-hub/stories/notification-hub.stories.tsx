import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { getOperationName, Operation } from 'urql';

import { NotificationHub } from '../notification-hub';
import { messages } from './mock-data';

type NotificationHubType = typeof NotificationHub;
export default {
  title: 'Blocks/NotificationHub',
  component: NotificationHub,
} as ComponentMeta<NotificationHubType>;

const Template: ComponentStory<NotificationHubType> = (args: any) => (
  <div>
    <NotificationHub {...args} />
  </div>
);

export const Default = Template.bind({});
Default.parameters = {
  urql: (op: Operation) => {
    const query = getOperationName(op.query);
    // console.log({ op, subscription: query });
    if (query === 'currentNotificationMessages') {
      return {
        data: messages,
      };
    }
    return { data: {} };
  },
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const notificationButton = canvas.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
};
