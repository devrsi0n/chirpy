import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Footer } from '..';

const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  ...jest.requireActual('next-themes'),
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    themes: ['light', 'dark', 'system'],
  }),
}));

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render basic links', () => {
    expect(
      screen.queryByRole('link', {
        name: 'Terms',
      }),
    ).toBeTruthy();
    expect(
      screen.queryByRole('link', {
        name: 'Privacy',
      }),
    ).toBeTruthy();
  });

  it('should call setTheme when click on icon button', () => {
    expect(mockSetTheme).not.toHaveBeenCalled();
    userEvent.click(screen.getByLabelText('light theme'));
    expect(mockSetTheme).toHaveBeenCalled();
  });
});
