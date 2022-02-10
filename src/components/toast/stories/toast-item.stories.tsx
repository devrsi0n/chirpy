import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ToastItem } from '../toast-item';

export default {
  title: 'Component/ToastItem',
  component: ToastItem,
} as ComponentMeta<typeof ToastItem>;

const Template: ComponentStory<typeof ToastItem> = (args) => <ToastItem {...args} />;

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  id: 'TitleOnly',
  title: 'Title only',
  type: 'success',
};

export const Description = Template.bind({});
Description.args = {
  id: 'Description',
  title: 'Description',
  description: 'This is a long description',
  type: 'success',
};

export const Info = Template.bind({});
Info.args = {
  id: 'Info',
  title: 'Info',
  description: 'This is a long info',
  type: 'info',
};

export const Action = Template.bind({});
Action.args = {
  id: 'action',
  title: 'New version available',
  action: {
    label: 'Refresh',
    onClick: () => alert('Action clicked'),
  },
  type: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  id: 'Warning',
  title: 'Warning',
  description: 'This is a long warning',
  type: 'warning',
};

export const Error = Template.bind({});
Error.args = {
  id: 'Error',
  title: 'Error',
  description: 'This is a long error',
  type: 'error',
};
