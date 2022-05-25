import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import { ICheckToxicText } from '$/server/services/content-classifier/toxic-text';

import { RichTextEditor } from '../rich-text-editor';

export default {
  title: 'Blocks/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      toxic: [
        rest.get('*/api/content-classifier/toxic-text', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json<ICheckToxicText>({
              matchedLabels: [],
            }),
          );
        }),
      ],
    },
  },
};
