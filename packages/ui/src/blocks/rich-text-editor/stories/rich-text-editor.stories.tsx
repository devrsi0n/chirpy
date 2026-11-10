import { ICheckToxicText } from '@chirpy-dev/types';
import { Meta, StoryFn } from '@storybook/nextjs';
import { http, HttpResponse } from 'msw';
import { userEvent, within } from 'storybook/test';

import { RichTextEditor } from '../rich-text-editor';

export default {
  title: 'Blocks/RichTextEditor',
  component: RichTextEditor,
  argTypes: {
    readOnly: {
      type: 'boolean',
    },
    onSubmit: {
      action: true,
    },
  },
} as Meta<typeof RichTextEditor>;

const Template: StoryFn<typeof RichTextEditor> = (args) => (
  <RichTextEditor {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onSubmit: () => Promise.resolve(),
};

Default.parameters = {
  msw: {
    handlers: {
      toxic: [
        http.get('*/api/content-classifier/toxic-text', () => {
          return HttpResponse.json<ICheckToxicText>({ matchedLabels: [] });
        }),
      ],
    },
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // const getAskNextTimeButton = () =>
  //   canvas.getByRole('button', {
  //     name: 'Ask next time',
  //   });
  const inputField = canvas.getByRole('textbox');
  const testText = 'This is a testing text';
  await userEvent.type(inputField, testText);
  // const postButton = canvas.getByRole('button', {
  //   name: 'Post',
  // });
  // await userEvent.click(postButton);
  // await waitFor(
  //   async () => {
  //     await expect(getAskNextTimeButton()).toBeTruthy();
  //   },
  //   {
  //     timeout: 1000,
  //   },
  // );
  // await userEvent.click(getAskNextTimeButton());
  // expect(mockOnSubmit).toHaveBeenCalledWith(testText);
};
