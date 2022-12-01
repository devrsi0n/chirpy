import { cleanup, screen } from '@testing-library/react';

import { SignInPage } from '../..';
import { pageRender } from '../../../__tests__/fixtures/page-render';

describe('Sign in page', () => {
  beforeEach(() => {
    pageRender(<SignInPage />);
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
