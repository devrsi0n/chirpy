import { cleanup, screen, waitFor } from '@testing-library/react';

import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

import SignInSuccess from '../../pages/sign-in-success';
import { pageRender } from '../fixtures/render';

const mockReload = jest.fn();

Object.defineProperty(window, 'location', {
  writable: true,
  value: { ...window.location, reload: mockReload },
});

describe('Sign in success page', () => {
  beforeEach(() => {
    pageRender(<SignInSuccess />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the title', () => {
    expect(screen.getByText(/sign in success/i)).toBeInTheDocument();
  });

  it('should set storage', async () => {
    await waitFor(
      () => {
        expect(window.localStorage.getItem(LOG_IN_SUCCESS_KEY)).toBe('true');
        return expect(mockReload).toHaveBeenCalled();
      },
      { timeout: 3500 },
    );
  });
});
