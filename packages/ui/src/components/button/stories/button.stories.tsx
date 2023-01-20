import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, ButtonProps } from '../button';

type ButtonType = typeof Button;
export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<ButtonType>;

const variants: ButtonProps['variant'][] = ['primary', 'secondary', 'text'];

const Template: ComponentStory<ButtonType> = (args: ButtonProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-center gap-6">
        {variants.map((variant) => (
          <Button key={variant} {...args} variant={variant}>
            Button
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Danger = Template.bind({});
Danger.args = {
  danger: true,
};
