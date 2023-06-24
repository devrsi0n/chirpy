import { StoryFn, Meta } from '@storybook/react';

import { ToastItem } from '../toast-item';

export default {
  title: 'Components/ToastItem',
  component: ToastItem,
} as Meta<typeof ToastItem>;

export const TitleOnly = {
  args: {
    id: 'TitleOnly',
    title: 'Title only',
    type: 'success',
  },
};

export const Description = {
  args: {
    id: 'Description',
    title: 'Description',
    description: 'This is a long description',
    type: 'success',
  },
};

export const Info = {
  args: {
    id: 'Info',
    title: 'Info',
    description: 'This is a long info',
    type: 'info',
  },
};

export const Action = {
  args: {
    id: 'action',
    title: 'New version available',
    action: {
      label: 'Refresh',
      onClick: () => alert('Action clicked'),
    },
    type: 'info',
  },
};

export const Warning = {
  args: {
    id: 'Warning',
    title: 'Warning',
    description: 'This is a long warning',
    type: 'warning',
  },
};

export const Error = {
  args: {
    id: 'Error',
    title: 'Error',
    description: 'This is a long error',
    type: 'error',
  },
};
