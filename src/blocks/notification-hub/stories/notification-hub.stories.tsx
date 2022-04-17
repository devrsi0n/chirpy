import { ComponentMeta, ComponentStory } from '@storybook/react';
import { screen, userEvent } from '@storybook/testing-library';
import { getOperationName, Operation } from 'urql';

import { NotificationHub } from '../notification-hub';
import { messages } from './mock-data';

type NotificationHubType = typeof NotificationHub;
export default {
  title: 'Blocks/NotificationHub',
  component: NotificationHub,
} as ComponentMeta<NotificationHubType>;

const Template: ComponentStory<NotificationHubType> = (args) => (
  <div>
    <NotificationHub {...args} />
  </div>
);

export const Default = Template.bind({});
Default.parameters = {
  urql: (op: Operation) => {
    const query = getOperationName(op.query);
    console.log({ op, subscription: query });
    if (query === 'currentNotificationMessages') {
      return {
        data: messages,
      };
    }
    return { data: {} };
  },
};
Default.play = async () => {
  const notificationButton = screen.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
};
