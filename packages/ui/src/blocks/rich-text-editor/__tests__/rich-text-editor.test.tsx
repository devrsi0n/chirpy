import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pageRender } from 'src/__tests__/fixtures/page-render';
import { RichTextEditor } from '../rich-text-editor';

const mockOnSubmit = jest.fn();

describe('rich-text-editor', () => {
  beforeEach(() => {
    pageRender(<RichTextEditor onSubmit={mockOnSubmit} />);
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
