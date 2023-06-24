import { StoryFn, Meta } from '@storybook/react';

import { Alert } from '../alert';

export default {
  title: 'Components/Alert',
  component: Alert,
} as Meta<typeof Alert>;

export const Warn = {
  args: {
    title: 'Warning',
    content: 'This is a warning alert',
    type: 'warn',
  },
};
