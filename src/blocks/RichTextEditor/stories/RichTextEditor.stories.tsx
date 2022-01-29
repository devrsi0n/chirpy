import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RichTextEditor } from '..';

export default {
  title: 'Blocks',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />;

export const Editor = Template.bind({});
Editor.storyName = 'RichTextEditor';
