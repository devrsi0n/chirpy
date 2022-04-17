import { addDecorator, ComponentMeta, ComponentStory } from '@storybook/react';
import { urqlDecorator } from '@urql/storybook-addon';
import { getOperationName, Operation } from 'urql';

import { NotificationHub } from '../notification-hub';
import { messages } from './mock-data';

addDecorator(urqlDecorator);

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

export const Unread = Template.bind({});
Unread.parameters = {
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
