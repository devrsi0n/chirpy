import { cleanup, screen } from '@testing-library/react';

import SignIn from '../../../pages/auth/sign-in';
import { pageRender } from '../../fixtures/page-render';

describe('Sign in page', () => {
  beforeEach(() => {
    pageRender(<SignIn />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the title and links', () => {
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Terms of Service',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Privacy Policy',
      }),
    ).toBeInTheDocument();
  });
});
