import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Alert } from '../alert';

const text = 'This is a test alert';

describe('Alert', () => {
  beforeEach(() => {
    render(<Alert type="warn">{text}</Alert>);
  });

  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the text', () => {
    expect(screen.getByText(text)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText('Dismiss'));
    expect(screen.queryByText(text)).toBeFalsy();
  });
});
