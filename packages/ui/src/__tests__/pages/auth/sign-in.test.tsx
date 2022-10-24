import { cleanup, screen } from '@testing-library/react';

import {SignInPage} from '../../../pages';
import { pageRender } from '../../fixtures/page-render';

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
