import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RichTextEditor } from '../rich-text-editor';

export default {
  title: 'Blocks/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />;

export const Default = Template.bind({});

export const MainButton = Template.bind({});
MainButton.decorators;
