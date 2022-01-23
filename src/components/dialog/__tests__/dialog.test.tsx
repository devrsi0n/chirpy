import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog } from '..';

const mockHandleClose = jest.fn();
const mockShouldShowDialog = jest.fn().mockReturnValue(false);
const title = 'Title of dialog';
const content = 'Content of dialog';

describe('Dialog', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should not show dialog if props.show is false', () => {
    renderComponent();
    expect(screen.queryByText(title)).toBeNull();
    expect(screen.queryByText(content)).toBeNull();
  });

  it('should show dialog if props.show is true', () => {
    mockShouldShowDialog.mockReturnValue(true);
    renderComponent();
    expect(screen.queryByText(title)).toBeTruthy();
    expect(screen.queryByText(content)).toBeTruthy();
  });

  it('should dismiss the dialog if click the dismiss button', () => {
    mockShouldShowDialog.mockReturnValue(true);
    renderComponent();
    expect(mockHandleClose).not.toHaveBeenCalled();
    userEvent.click(screen.getByLabelText('Dismiss'));
    expect(mockHandleClose).toHaveBeenCalled();
  });
});

function renderComponent() {
  render(
    <Dialog title={title} show={mockShouldShowDialog()} onClose={mockHandleClose} showDismissButton>
      {content}
    </Dialog>,
  );
}
