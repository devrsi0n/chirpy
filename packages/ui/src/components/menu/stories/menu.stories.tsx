import { Meta, StoryFn } from '@storybook/react';

import { IconCloud } from '../../icons';
import { Menu } from '../menu';

type MenuType = typeof Menu;
export default {
  title: 'Components/Menu',
  component: Menu,
} as Meta<MenuType>;

const Template: StoryFn<MenuType> = () => {
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

export const Default = {
  render: Template,
};
