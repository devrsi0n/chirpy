import { Meta, StoryFn } from '@storybook/nextjs';

import { Alert } from '../alert';

export default {
  title: 'Components/Alert',
  component: Alert,
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

export const Warn = Template.bind({});
Warn.args = {
  title: 'Warning',
  content: 'This is a warning alert',
  type: 'warn',
};
