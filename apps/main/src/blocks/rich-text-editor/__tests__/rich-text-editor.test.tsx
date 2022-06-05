import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from '../stories/rich-text-editor.stories';

const { Default } = composeStories(stories);
const mockOnSubmit = jest.fn();

describe('rich-text-editor', () => {
  beforeEach(() => {
    render(<Default onSubmit={mockOnSubmit} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should post the text', async () => {
    const inputField = screen.getByRole('textbox');
    const testText = 'This is a testing text';
    await userEvent.type(inputField, testText);
    const postButton = screen.getByRole('button', {
      name: 'Post',
    });
    await userEvent.click(postButton);
    // await waitFor(() => {
    //   expect(getAskNextTimeButton()).toBeTruthy();
    // }, {
    //   timeout: 1000
    // });
    // await userEvent.click(getAskNextTimeButton());
    // expect(mockOnSubmit).toHaveBeenCalledWith(testText);
  });
});

// const getAskNextTimeButton = () =>
//   screen.getByRole('button', {
//     name: 'Ask next time',
//   });
