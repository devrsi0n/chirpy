import { Meta, StoryFn } from '@storybook/react';

import { Logo } from '../logo';

type LogoType = typeof Logo;
export default {
  title: 'Components/Logo',
  component: Logo,
} as Meta<LogoType>;

const Template: StoryFn<LogoType> = (args: any) => {
  return (
    <div className="flex flex-row justify-center">
      <Logo {...args} />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    showBadge: true,
  },
};
