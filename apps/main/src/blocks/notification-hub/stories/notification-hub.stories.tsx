import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { getOperationName, Operation } from 'urql';

import { CurrentNotificationMessagesSubscription } from '$/graphql/generated/notification';

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

export const Empty = Template.bind({});
Empty.parameters = {
  urql: getUrqlParameter({
    notificationMessages: [],
  } as CurrentNotificationMessagesSubscription),
};

export const Default = Template.bind({});
Default.parameters = {
  urql: getUrqlParameter(messages),
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const notificationButton = canvas.getByLabelText('click to open the menu');
  await userEvent.click(notificationButton);
};

function getUrqlParameter(data: CurrentNotificationMessagesSubscription) {
  return (op: Operation) => {
    const query = getOperationName(op.query);
    // logger.debug({ op, subscription: query });
    if (query === 'currentNotificationMessages') {
      return {
        data,
      };
    }
    return { data: {} };
  };
}
