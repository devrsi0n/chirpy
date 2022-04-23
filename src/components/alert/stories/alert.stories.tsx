import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Alert } from '../alert';

export default {
  title: 'Components/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Warn = Template.bind({});
Warn.args = {
  children: 'Warn',
  type: 'warn',
};
