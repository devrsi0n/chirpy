import { ICheckToxicText } from '@chirpy-dev/types';
import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { rest } from 'msw';

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

export const Default = {
  args: {
    onSubmit: () => Promise.resolve(),
  },

  parameters: {
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
  },

  play: async ({ canvasElement }) => {
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
  },
};
