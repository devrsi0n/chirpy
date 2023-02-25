import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconCloud } from '../../icons';
import { Menu } from '../menu';

type MenuType = typeof Menu;
export default {
  title: 'Components/Menu',
  component: Menu,
} as ComponentMeta<MenuType>;

const Template: ComponentStory<MenuType> = () => {
  return (
    <div className="flex flex-row justify-center">
      <Menu>
        <Menu.Button>
          <IconCloud />
        </Menu.Button>
        <Menu.Items>
          <Menu.Item>Apple</Menu.Item>
          <Menu.Item>Peach</Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export const Default = Template.bind({});
