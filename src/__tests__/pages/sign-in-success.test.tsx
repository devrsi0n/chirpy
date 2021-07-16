import { cleanup, screen, waitFor } from '@testing-library/react';

import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

import SignInSuccess from '../../pages/sign-in-success';
import { pageRender } from '../fixtures/render';
import { mockNextRouter } from '../mocks/nextRouter';

const mockReload = jest.fn();

Object.defineProperty(window, 'location', {
  writable: true,
  value: { ...window.location, reload: mockReload },
});

jest.setTimeout(10_000);

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

  it('should nav to home page after timeout', async () => {
    await waitFor(
      () => {
        expect(window.localStorage.getItem(LOG_IN_SUCCESS_KEY)).toBe('/');
        return expect(mockNextRouter.push).toHaveBeenCalledWith('/');
      },
      { timeout: 6500 },
    );
  });
});
