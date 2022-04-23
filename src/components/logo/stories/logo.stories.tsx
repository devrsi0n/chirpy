import { ComponentMeta, ComponentStory } from '@storybook/react';
import 'twin.macro';

import { Logo } from '../logo';

type LogoType = typeof Logo;
export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<LogoType>;

const Template: ComponentStory<LogoType> = (args: any) => {
  return (
    <div tw="flex flex-row justify-center">
      <Logo {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  showBadge: true,
};
