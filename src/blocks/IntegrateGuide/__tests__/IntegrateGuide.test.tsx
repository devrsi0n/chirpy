import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IntegrateGuide } from '../IntegrateGuide';

const domain = 'test.com';

describe('IntegrateGuide', () => {
  beforeEach(() => {
    render(<IntegrateGuide domain={domain} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should open integrate guide', async () => {
    const integrateButton = screen.getByRole('button', {
      name: /integrate guide/i,
    });
    userEvent.click(integrateButton);
    await waitFor(() =>
      expect(screen.getByText(/Get Started with \S+ Comment/)).toBeInTheDocument(),
    );
  });
});
