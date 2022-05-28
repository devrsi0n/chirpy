import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from '../stories/rich-text-editor.stories';

const { Default } = composeStories(stories);

describe('rich-text-editor', () => {
  beforeEach(() => {
    render(<Default />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should post the text', async () => {
    const inputField = screen.getByRole('textbox');
    await userEvent.type(inputField, 'This is a testing text');
    const postButton = screen.getByRole('button', {
      name: 'Post',
    });
    expect(postButton).toBeTruthy();
  });
});
